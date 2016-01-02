import path from 'path'
import nodemailer from 'nodemailer'
import {extend} from 'lodash'
import {EmailTemplate} from 'email-templates'
import {User, Email} from '../models'

const transport = nodemailer.createTransport({
  service: 'sendgrid',
  auth: {
    user: process.env.SENDGRID_USERNAME,
    pass: process.env.SENDGRID_PASSWORD
  }
}, {
  from: process.env.DEFAULT_EMAIL_SENDER
})

export default function email (job_id, opt, done) {
  let template = new EmailTemplate(path.join(__dirname, '..', 'views', 'email', opt.template || ''))
  User.where({id: opt.user_id}).fetch().then(user => {
    template.render(user || {}, (err, result) => {
      if (err) { return console.error('Bad Email Options', err) }
      let mail = extend(opt, result)
      transport.sendMail(mail, (err, info) => {
        let status = err ? 2 : 1
        let reason = info && info.response
        Email.forge({
          job_id,
          user_id: opt.user_id,
          to: opt.to,
          from: opt.from,
          subject: opt.subject,
          template: opt.template,
          status, reason
        }).save().then(done)
      })
    })
  })
}
