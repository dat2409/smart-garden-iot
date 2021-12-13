const { PrismaClient } = require('@prisma/client');
const { plan, dayPlan } = new PrismaClient();

class PlanController {
  /**
   * [POST]
   * /plans/:destinationId
   */
  create(req, res, next) {
    const { name, dayPlans } = req.body;
    plan.create({
      data: {
        name,
        destinationId: parseInt(req.params.destinationId)
      }
    })
      .then(async function (newPlan) {
        for (var i = 0; i < dayPlans.length; i++) {
          const { day, title, desc } = dayPlans[i];
          await dayPlan.create({
            data: {
              day,
              title,
              desc,
              planId: newPlan.id
            }
          })
        }
      })
    res.send('ok')
  }

  /**
   * [GET]
   * /plans/:id
   */
  async show(req, res, next) {
    const planDetail = await plan.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        dayplans: true
      }
    })
    res.send(planDetail);
  }

  /**
   * [GET]
   * /plans/
   */
  index(req, res, next) {
    plan.findMany()
      .then(plans => res.send(plans))
  }

  /**
   * [GET]
   * /plans/edit/:id
   */
  async edit(req, res, next) {
    const planDetail = await plan.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        dayplans: true
      }
    })
    res.send(planDetail);
  }

  /**
   * [PATCH]
   * /plans/:id
   */
  async update(req, res, next) {
    const updatedPlan = await plan.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
        name: req.body.name
      }
    })

    const dayPlans = req.body.dayPlans;
    for (var i = 0; i < dayPlans.length; i++) {
      const { day, title, desc } = dayPlans[i];
      await dayPlan.update({
        where: {
          id: dayPlans[i].id
        },
        data: {
          day,
          title,
          desc
        }
      })
    }
    res.send('ok')
  }

  /**
   * [DELETE]
   * /plans/:id
   */
  deletePlan(req, res, next) {
    dayPlan.deleteMany({
      where: {
        planId: parseInt(req.params.id)
      }
    })
      .then(() => {
        plan.delete({
          where: {
            id: parseInt(req.params.id)
          }
        })
          .then(() => res.send('ok'))
      })
  }

  /**
   * [DELETE]
   * /plans/dayPlan/:id
   */
  deleteDayPlan(req, res, next) {
    dayPlan.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
      .then(dayPlan => res.send(dayPlan))
  }
}

module.exports = new PlanController();
