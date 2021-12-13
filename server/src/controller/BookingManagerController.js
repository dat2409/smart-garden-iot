const { PrismaClient } = require('@prisma/client');
const { invoice, tour, order } = new PrismaClient();

class BookingManagerController {
  /**
   * [POST]
   * /booking-manager/invoices/:orderId
   */
  async createInvoice(req, res, next) {
    const thisOrder = await order.findUnique({
      where: {
        id: parseInt(req.params.orderId)
      },
      select: {
        tour: {
          select: {
            sold: true
          }
        },
        tourId: true,
        quantity: true
      }
    })
    console.log(thisOrder)

    const sold = thisOrder.tour.sold + thisOrder.quantity;

    const newInvoice = invoice.create({
      data: {
        orderId: parseInt(req.params.orderId)
      }
    })

    const updatedTour = tour.update({
      where: {
        id: thisOrder.tourId
      },
      data: {
        sold
      }
    })

    const updatedOrder = order.update({
      where: {
        id: parseInt(req.params.orderId)
      },
      data: {
        isDeposited: true
      }
    })

    await Promise.all([newInvoice, updatedTour, updatedOrder])
    res.send('ok')
  }

  /**
   * [GET]
   * /booking-manager/invoices/:invoiceId
   */
  showInvoice(req, res, next) {
    invoice.findFirst({
      where: {
        id: parseInt(req.params.invoiceId)
      },
      include: {
        order: {
          include: {
            tour: {
              select: {
                name: true,
                id: true
              }
            }
          }
        }
      }
    })
      .then(invoice => res.send(invoice))
  }

  /**
   * [GET]
   * /booking-manager/orders/:orderId
   */
  showOrder(req, res, next) {
    order.findFirst({
      where: {
        id: parseInt(req.params.orderId)
      },
      include: {
        tour: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })
      .then(order => res.send(order))
  }

  /**
   * [GET]
   * /booking-manager/invoices
   */
  allInvoices(req, res, next) {
    invoice.findMany({
      include: {
        order: {
          include: {
            tour: {
              select: {
                name: true,
                id: true
              }
            }
          }
        }
      }
    })
      .then(invoices => res.send(invoices))
  }

  /**
   * [GET]
   * /booking-manager/orders
   */
  allOrders(req, res, next) {
    order.findMany({
      include: {
        tour: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })
      .then(orders => res.send(orders))
  }

  /**
   * [GET]
   * /booking-manager/invoices/edit/:invoiceId
   */
  editInvoice(req, res, next) {
    invoice.findFirst({
      where: {
        id: parseInt(req.params.invoiceId)
      },
      include: {
        order: {
          include: {
            tour: {
              select: {
                name: true,
                id: true
              }
            }
          }
        }
      }
    })
      .then(invoice => res.send(invoice))
  }

  /**
   * [PATCH]
   * /booking-manager/invoices/:invoiceId
   */
  async updateInvoice(req, res, next) {
    const thisInvoice = await invoice.findFirst({
      where: {
        id: parseInt(req.params.invoiceId)
      }
    })

    const isPaid = thisInvoice.isPaid;

    invoice.update({
      where: {
        id: parseInt(req.params.invoiceId)
      },
      data: {
        isPaid: !isPaid
      }
    })
      .then(invoice => res.send(invoice))
  }

  /**
   * [GET]
   * /booking-manager/orders/:orderId
   */
  async deleteOrder(req, res, next) {
    const thisOrder = await order.findFirst({
      where: {
        id: parseInt(req.params.orderId)
      }
    })

    if (thisOrder.isDeposited) {
      res.send(`This customer is deposited, you can't delete this order`)
    }
    else {
      order.delete({
        where: {
          id: parseInt(req.params.orderId)
        }
      })
        .then(order => res.send(order))
    }

  }
}

module.exports = new BookingManagerController();
