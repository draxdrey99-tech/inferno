---
title: SPF, DKIM and DMARC for Store Owners: A Plain Setup Guide
slug: spf-dkim-dmarc-setup-for-store-owners
excerpt: A plain-English guide to the three email authentication records every ecommerce store needs, how to check them and the mistakes that quietly hurt delivery.
meta_description: How to set up and check SPF, DKIM and DMARC for an ecommerce store so Gmail and Outlook trust your email. No jargon, with common mistakes.
tags: deliverability, authentication
---
SPF, DKIM and DMARC are three DNS records that prove your emails really come from your domain. Gmail, Yahoo and Outlook check them before deciding whether to deliver, filter or reject your mail. If you send marketing email for a store, you need all three in place.

This guide explains what each does, how to check yours and what to avoid. For short definitions, see our entries on [SPF, DKIM and DMARC](/glossary/spf-dkim-dmarc) and [sender reputation](/glossary/sender-reputation).

## What each record does

**SPF** is a list of the servers allowed to send email for your domain. If a message arrives from a server that is not on the list, the receiver can treat it with suspicion.

**DKIM** adds a digital signature to each email. The receiver checks the signature against a public key in your DNS to confirm the message was not changed in transit and came from you.

**DMARC** tells receivers what to do when SPF or DKIM fails, and sends you reports about who is sending mail as your domain. It also ties the two together by checking that the domain in the visible From address matches.

## Why it matters now

Large mailbox providers expect bulk senders to authenticate. If your records are missing or broken, more of your mail will land in spam or be rejected, and you will not get an error message telling you so. Open rates simply drift down.

## Step by step

1. **Decide your sending domain.** Many stores send from a subdomain such as a mail or news prefix, which keeps marketing reputation separate from the main domain. Whichever you choose, use it consistently.
2. **Set up authentication in your email platform.** In Klaviyo this is done in the settings for your sending domain, which gives you the DNS records to add. Add them at your domain host or DNS provider.
3. **Check SPF.** There must be only one SPF record per domain. If you already have one for another service, add Klaviyo to the existing record rather than creating a second.
4. **Check DKIM.** Confirm the DKIM records provided by your platform are published and verified.
5. **Publish DMARC.** Start with a monitoring policy so nothing breaks, read the reports for a few weeks, and then tighten the policy once you know every legitimate sender is passing.
6. **Test.** Send a message to your own Gmail address and view the original message headers. They show whether SPF, DKIM and DMARC passed.

## Common mistakes

- **Two SPF records.** This invalidates SPF. Merge them into one.
- **Leaving DMARC on monitoring forever.** Monitoring is a starting point, not a finish line.
- **Forgetting other senders.** Your store platform, helpdesk and invoicing tool may also send as your domain. Include them, or their mail will fail checks.
- **Sending from a free mailbox address.** Use your own domain.
- **Adding records at the wrong place.** DNS changes must be made where your domain's nameservers are actually pointed.

## What good looks like

All three records published, passing on a test message, DMARC reports being read, and a sending domain that matches your brand. After that, authentication stops being the thing that hurts you, and the rest of [email deliverability](/glossary/email-deliverability) comes down to list health and content.

## Want us to check it?

Authentication is the first thing our [free audit](/free-email-audit) checks. We verify your records, review list health and recent performance, and send you the findings in writing. Or read how our [email deliverability service](/services/email-deliverability) works.
