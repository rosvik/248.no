---
title: Making it myself
published: 2026-02-21T00:00:00.000Z
author:
  name: Johannes Røsvik
license:
  description: Copyright © 2026 Johannes Røsvik
---

I'm a bit of a hobby project-holic. For as long as I can remember, I've had some sort idea I've been tinkering with on the side in addition to whatever I was supposed to be doing. I find it so satisfying to chase down that idea you got that one time you were doing something, and thought "I can make something better than this crap". I don't mind giving in to my better judgement, and start *scratching that itch*. It's probably not a coincidence that several of my domains have renewal dates in the middle of exam season.

As an example, I built a [QR code generator website](https://qr.248.no/) a while ago because the site I had used for years started to charge $5 for SVG exports. I know that $5 won't pay back the time I used making it, but it turns out my stubbornness and spite don't need no funding.


## Building a house of cards

When I initially got into programming, I fell in love with the idea that a couple of PHP scripts, a MySQL database and a cheap Linux server could solve so many problems. By learning how to map logic to code, any problem could be solved with some very basic principles. Once you understood those, you just put the if statements and for loops in the right order, and a compiler would spit out the next billion dollar app.

The very first time I made a website, I remember putting some HTML and JavaScript I'd copied from Stack Overflow into a public Dropbox folder, and pointing the CNAME record of a free .tk domain to it. It totally looked like the real thing! You could go to a real domain on the internet, and my HTML would be rendered right there, in Internet Explorer. I felt like a genius! Though I knew that the "real" websites out there were different. Real websites used real programming languages, and wouldn't break when some startup in California changed their free tier.

And as a surprise to no one, my Dropbox hosted website didn't last very long. If the "feature" of pointing CNAME records to dropbox.com ever was something other than a bug, Dropbox didn't consider free web hosting important for their business, and closed it down. Although I was sad to see my hacked together web server go, I wasn't surprised. I was trying to learn what the pros were doing anyway. Surely they were running on proper hardware they could controll, and kept a safe distance from free tiers and of companies with unclear business models.

As I started studying computer science, I was looking forward to that glorious day where I would step into the real world, and see how real professionals hosted their web services. I assumed they were using nothing but `awk` and `sed` to direct incoming packets to services that ran home made TCP implementations.

The reality though, looked more like my Dropbox stack than anything else.


## Someone else's solution

At some point I understood that the proper way to do it was to let others do the heavy lifting. It's better to rely on battle tested solutions for things that are connected to the internet. It's painless, secure and reliable, and it lets me, the web developer, focus on web development.

So, over the years, I have tried several "proper" hosted solutions. Heroku, Vercel, and Neon to name a few. But there's something in me that doesn't want to get invested. And (in stark contrast to the rest of this post) I think that's somewhat rational. If I'm on their free tier, I know the email about pricing changes is going to come. If I'm paying, I sure hope my page doesn't go viral and empties my bank account in the process.

Is using these platforms that different from how I used Dropbox? These platforms sell a product that's easy and cheap to get started with. But what I see, is a problem for my future self. I might be a pessimist, but enshittification is real, and as someone who like to keeping my ancient projects live, I've come to the conclusion that I'm not going to count on some VC funded service that is too good of a deal to be true. Not for the long run.

You've probably heard that nothing is so permanent as a temporary solution. But I think we also should be saying that *nothing is so temporary as someone else's solution.*

Although I understand why it is this way, I'm a bit sad to see that the best pracice of website hosting creates a gap between the programmer and the computer. It's cheaper, more convenient, better for security and reliability.


## My solution

However, I've come to realise that my hobby projects doesn't have to follow best practices. So a while back, I decided to scratch an itch I maybe shouldn't have. I know that whatever Vercel is charging next year won't ever pay back the time I used making it, but it turns out, my stubbornness and spite don't need no funding.

---

**Container Cubby** is an open source container registry I built in rust. It's made to self-host, and stores any docker containers as plain old files on a file system. It uses Linux concepts like symlinks and extended attributes instead of an off the shelf database. It's super cool, and hopefully I'll get around to writing about it some day.

**Cubbyman** is an tool similar to to Docker Compose I cobbled together after the registry was ready. It's main purpose is to reload a set of Docker containers on a VPS once it gets the signal that one of the docker images has been updated. I'll publish it on my GitHub once I've added some final important features. Soon™.

By hosting these two services, I get automatic deployment of any Docker container to any VPS independent of services like Docker Hub. It's simple in theory, tailored to my use case and free of features I don't use.

This very page has been hosted with this system for a year now, as well as all the tools I link from the [front page](https://248.no). I also host an instance of Container Cubby at [cubby.no](https://cubby.no), where you can download a copy of the registry from itself.

```sh
docker pull cubby.no/rosvik/container-cubby
```

No tool is perfect, but Container Cubby and Cubbyman are my own. If I need more features, I add them without having to inherit a massive codebase from someone else.


## Justifying my madness

I could have (and probably should have) used some open source solution that already exists out there. But I felt like Kubernetes was overkill. Coolify is nice and all, but I didn't feel comfortable offloading so much complexity into a tool I didn't understand, nor am I sure it will stay the tool I need for the next decade or so.

But more importantly, the fact that these services hide away all of the complexity involved with hosting websites, make it so that you don't actually learn much about hosting. Vercel won't teach you SSH, Nginx or SSL. It will make you think that firewalls are a relic of the past.

And this has always been a major argument for having hobby projects for me. If hosting stuff on the internet doesn't learn me anything, I'm not sure I'll even bother hosting them. Doing it on my own is how I learn. I'm pretty sure I've learned more about security by being terrible at it, than I did while taking my masters degree.

As years went on, my server setup kept evolving, slowly building on what I learned from experience. But from work and professional circles, I only learned that I shouldn't. Container Cubby and Cubbyman are tools that gives me the ergonomics of modern web development without losing sight of the computer it's running on. Not best practice, but that's ok.


## Do it the wrong way

As this project is getting closer and closer to a usable state, I'm trying to reflect on exactly why I made it. I can think of many, but none that justifies the ungodly amount of hours I've poured into it. It's a container registry and a glorified bash script. But it hosts all the side projects I've been accumulating for the last decade or so. And I think that's pretty cool!

But at the core, I think it's been more of a crusade to find that joy of doing things on my own again. It's proving to myself that I'm stubborn enough to do things the wrong way. But doing it in a way that feels right.

Full disclaimer, I wouldn't actually recommend doing what I am, and building your infrastructure from scratch. Hosting is a solved problem, and as with any problem that's solved in computer science, it will be open sourced and downloaded a few billion times instead of re-implemented by naive front end developers like myself that aren't quite sure what a Docker container even is. There's no reason to reinvent the wheel. Doing everything yourself would be nothing but counterproductive, a huge waste of everyone's time, less secure, slower, buggier...

But no one is stopping you, right? Go scratch that itch. Come to think of it, maybe I am recommending it.
