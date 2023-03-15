# next-auth-subdomain

A very basic sample of a separate next-auth authentication service that is meant to be hosted as a subdomain

The repo contains two projects, `auth` and `client`

`auth` runs on port 3000

`client` runs on port 8080

You will need to provide `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables for the `auth` project, or alternatively change the providers in `[...nextauth].ts` to use a different IDP

This was created to demonstrate the following discussion thread: https://github.com/nextauthjs/next-auth/issues/2414#issue-950161835
