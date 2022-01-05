const { PrismaClient } = require('@prisma/client');
const { tourService, tour } = new PrismaClient();
const set = require('date-fns/set');

class TourController {
  /**
   * [POST]
   * /tours/
   */
  create(req, res, next) {
    const { name, departure, departureDay, departureTimeReq, price, desc, maxPeople,
      flight, planId, services } = req.body;

    const departureTime = new Date(`${departureDay} ${departureTimeReq}`)

      const listServices = [];
      for (var i = 0; i < services.length; i++) {
        listServices[i] = {
          service: {
            connect: {
              name: services[i],
            }
          }
        }
      }

    tour.create({
      data: {
        name,
        departure,
        departureTime,
        price,
        desc,
        maxPeople,
        flight,
        planId,
        services: {
          create: listServices
        }
      }
    })
      .then(tour => res.send(tour))
  }

  /**
   * [GET]
   * /tours/:id
   */
  show(req, res, next) {
    tour.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        plan: {
          include: {
            dayplans: true,
            destination: true
          }
        },
        services: {
          select: {
            service: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
      .then(tour => res.send(tour))
  }

  /**
   * [GET]
   * /tours/
   */
  index(req, res, next) {
    tour.findMany({
      include: {
        plan: {
          select: {
            name: true
          }
        },
        services: {
          select: {
            service: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
      .then(tour => res.send(tour))
  }

  /**
   * [GET]
   * /tours/edit/:id
   */
  edit(req, res, next) {
    tour.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        plan: {
          select: {
            name: true
          }
        },
        services: {
          select: {
            service: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
      .then(tour => res.send(tour))
  }

  /**
   * [PATCH]
   * /tours/:id
   * Xem xét updateMany cho plan where tourId = param id
   */
  update(req, res, next) {
    const { name, departure, departureDay, departureTimeReq, price, desc, maxPeople,
      flight, planId, services } = req.body;

    const departureTime = new Date(`${departureDay} ${departureTimeReq}`)

    const listServices = [];
    for (var i = 0; i < services.length; i++) {
      listServices[i] = {
        service: {
          connect: {
            name: services[i],
          }
        }
      }
    }

    tourService.deleteMany({
      where: {
        tourId: parseInt(req.params.id)
      }
    })
      .then(() => {
        tour.update({
          where: {
            id: parseInt(req.params.id)
          },
          data: {
            name,
            departure,
            departureTime,
            price,
            desc,
            maxPeople,
            flight,
            planId,
            services: {
              create: listServices
            }
          }
        })
          .then(tour => res.send(tour))
      })

  }

  /**
   * [DELETE]
   * /tours/:id
   */
  delete(req, res, next) {
    tourService.deleteMany({
      where: {
        tourId: parseInt(req.params.id)
      }
    })
      .then(() => {
        tour.delete({
          where: {
            id: parseInt(req.params.id)
          }
        })
          .then(tour => res.send(tour))
      })
  }

  test(req, res) {
    const day = '2022-02-03';
    const time = '08:30';
    const datetime = new Date(`${day} ${time}`);
    res.send(datetime)
  }
}

module.exports = new TourController();
