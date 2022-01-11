const { PrismaClient, Prisma } = require('@prisma/client');
const { tourService, tour, plan, destination } = new PrismaClient();
const prisma = new PrismaClient();
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
          include: {
            destination: {
              include: {
                images: true
              }
            },
            dayplans: true
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

  search(req, res, next) {
    const destinationName = `%${req.query.destinationName}`;
    const month = `%${req.query.month}`
    prisma.$queryRaw`SELECT * FROM Tour, Destination, Plan where
      Tour.planId = Plan.id and Plan.destinationId = Destination.id and
      Destination.name like ${destinationName} and month(tour.departureTime) like ${month}`
      .then(tours => res.send(tours))
  }
}

module.exports = new TourController();
