import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import {
  emailActivationTemplate,
  forgotEmailTemplate,
  subscriptionInformationTemplate,
  subscriptionPostTemplate,
  messageReceivedTemplate,
} from './templates';

import {
  ICompileEmailActivationTemplate,
  ICompileSubscriptionPostTemplate,
  ICompileResetEmailTemplate,
  ICompileSubscriptionInformationTemplate,
  IMessageReceivedTemplate,
  ISendEmail,
} from './types/types';

@Injectable()
export class MailerService {
  constructor(private jwtService: JwtService) {}

  mailTransport(isNewsletter: boolean | undefined) {
    const {
      MAIL_ADDRESS,
      MAIL_ADDRESS_NEWSLETTER,
      MAIL_HOST,
      MAIL_HOST_NEWSLETTER,
      MAIL_PORT,
      MAIL_PORT_NEWSLETTER,
      MAIL_PASSWORD,
      MAIL_PASSWORD_NEWSLETTER,
    } = process.env;

    const transactionsTransporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: +MAIL_PORT,
      auth: {
        user: MAIL_ADDRESS,
        pass: MAIL_PASSWORD,
      },
      greetingTimeout: 1000,
      dnsTimeout: 1000,
    });

    const newsletterTransporter = nodemailer.createTransport({
      host: MAIL_HOST_NEWSLETTER,
      port: +MAIL_PORT_NEWSLETTER,
      auth: {
        user: MAIL_ADDRESS_NEWSLETTER,
        pass: MAIL_PASSWORD_NEWSLETTER,
      },
      greetingTimeout: 1000,
      dnsTimeout: 1000,
    });

    return isNewsletter ? newsletterTransporter : transactionsTransporter;
  }

  async sendMail(dto: ISendEmail) {
    const { MAIL_ADDRESS, MAIL_ADDRESS_NEWSLETTER, MAIL_USER } = process.env;
    const { isNewsletter, recipients, subject, html } = dto;

    const transport = this.mailTransport(isNewsletter);

    const options: Mail.Options = {
      from: {
        name: MAIL_USER,
        address: isNewsletter ? MAIL_ADDRESS_NEWSLETTER : MAIL_ADDRESS,
      },
      to: recipients,
      subject,
      html,
    };

    try {
      return await transport.sendMail(options);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // **
  async compileEmailActivationTemplate({ email }: { email: string }) {
    const siteUrl = process.env.FRONTEND_URL;
    const activationToken = await this.jwtService.signAsync({
      email: email.toLowerCase(),
    });

    const vars: ICompileEmailActivationTemplate = {
      email: email.toLowerCase(),
      siteUrl: siteUrl,
      activationUrl: siteUrl + '/auth/activation/' + activationToken,
    };

    const template = Handlebars.compile(emailActivationTemplate);
    const htmlBody = template(vars);

    return htmlBody;
  }

  // **
  async compileResetEmailTemplate({ email }: { email: string }) {
    const siteUrl = process.env.FRONTEND_URL;
    const resetToken = await this.jwtService.signAsync({
      email: email.toLowerCase(),
      expiresIn: Date.now() + 86400000,
    });

    const vars: ICompileResetEmailTemplate = {
      email: email.toLowerCase(),
      siteUrl: siteUrl,
      resetPasswordUrl: siteUrl + '/auth/reset/' + resetToken,
    };

    const template = Handlebars.compile(forgotEmailTemplate);
    const htmlBody = template(vars);

    return htmlBody;
  }

  // // **
  // async compileSubscriptionInformationTemplate(
  //   vars: ICompileSubscriptionInformationTemplate,
  // ) {
  //   const template = Handlebars.compile(subscriptionInformationTemplate);
  //   const htmlBody = template(vars);

  //   return htmlBody;
  // }

  // // **
  // async compileSubscriptionPostTemplate(
  //   vars: ICompileSubscriptionPostTemplate,
  // ) {
  //   const template = Handlebars.compile(subscriptionPostTemplate);

  //   const htmlBody = template(vars);
  //   return htmlBody;
  // }

  // // **
  // async compileMessageReceivedTemplate() {
  //   const siteUrl = process.env.FRONTEND_URL;

  //   const vars: IMessageReceivedTemplate = {
  //     siteUrl: siteUrl,
  //   };

  //   const template = Handlebars.compile(messageReceivedTemplate);
  //   const htmlBody = template(vars);

  //   return htmlBody;
  // }
}

// ///////////////////////////////////////////////////////////
// TIMEWEB:
//   const transporter = nodemailer.createTransport({
//     host: MAIL_HOST,
//     port: +MAIL_PORT,
//     auth: {
//       user: isNewsletter ? MAIL_ADDRESS_NEWSLETTER : MAIL_ADDRESS,
//       pass: MAIL_PASSWORD,
//     },
//     greetingTimeout: 1000,
//     dnsTimeout: 1000,
//   });

// GOOGLE:
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: MAIL_HOST,
//   port: +MAIL_PORT,
//   secure: true,
//   auth: {
//     user: isNewsletter ? MAIL_ADDRESS_NEWSLETTER : MAIL_ADDRESS,
//     pass: MAIL_PASSWORD,
//   },
//   greetingTimeout: 1000,
//   dnsTimeout: 1000,
// });

// OTHER TRANSPORTER OPTIONS:
// authMethod: 'PLAIN',
// pool: true,
// secure: true,
// host: '',
