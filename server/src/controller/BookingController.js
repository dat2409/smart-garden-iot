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

    order.create({
      data: newOrder
    })
      .then(order => res.send(order))
  }
}

module.exports = new BookingController()
