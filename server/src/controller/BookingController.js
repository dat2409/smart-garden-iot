const { PrismaClient } = require('@prisma/client');
const { order } = new PrismaClient();

class BookingController {
  /**
   * [POST]
   * /booking/:tourId
   */
  create(req, res, next) {
    const newOrder = req.body;
    newOrder.tourId = parseInt(req.params.tourId);
    newOrder.quantity = parseInt(newOrder.quantity);
    newOrder.totalPrice = parseInt(newOrder.totalPrice);

    order.create({
      data: newOrder
    })
      .then(order => res.send(order))
  }
}

module.exports = new BookingController()
