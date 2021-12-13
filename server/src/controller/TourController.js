const { PrismaClient } = require('@prisma/client');
const { tourService, tour } = new PrismaClient();
const set = require('date-fns/set');

class TourController {
  /**
   * [POST]
   * /tours/
   */
  create(req, res, next) {
    const { name, departure, departureDay, departureHour, departureMinute, days, price, desc, maxPeople,
      flight, destinationName, planName, services } = req.body;

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
        departureTime: set(new Date(departureDay), { hours: departureHour, minutes: departureMinute }),
        days,
        price,
        desc,
        maxPeople,
        flight,
        destinationName,
        planName,
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
        destination: {
          select: {
            name: true,
            address: true,
            desc: true
          }
        },
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
   * /tours/
   */
  index(req, res, next) {
    tour.findMany({
      include: {
        destination: {
          select: {
            name: true,
            address: true,
            desc: true
          }
        },
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
        destination: {
          select: {
            name: true,
            address: true,
            desc: true
          }
        },
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
   */
  update(req, res, next) {
    const { name, departure, departureDay, departureHour, departureMinute, days, price, desc, maxPeople,
      flight, destinationName, planName, services } = req.body;

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
            departureTime: set(new Date(departureDay), { hours: departureHour, minutes: departureMinute }),
            days,
            price,
            desc,
            maxPeople,
            flight,
            destinationName,
            planName,
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
}

module.exports = new TourController();
