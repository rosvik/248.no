---
title: Nothing is so temporary as someone else's solution
published: 2026-06-05T16:00:00.000Z
author:
  name: Johannes Røsvik
license:
  description: Copyright © 2026 Johannes Røsvik
note: "This post was written by an actual human being. There are three R's in strawberry."
---

I'm a bit of a hobby project-holic. For as long as I can remember, I've had some idea I've been tinkering with on the side, in addition to whatever I was supposed to be doing. I find it so satisfying to chase down that idea you got that one time you were doing something, and thought "I can make something better than this crap". I don't mind giving in to my better judgement, and start *scratching that itch*. So it's probably not a coincidence that several of my domains have renewal dates in the middle of exam season.

As an example, I built a [QR code generator website](https://qr.248.no/) a while ago because the site I had used for years started to charge $5 for SVG exports. I know that $5 won't pay back the time I spent making it, but it turns out my stubbornness and spite don't need no funding.


## Building on sand

When I initially got into programming, I fell in love with the idea that a couple of PHP scripts, a MySQL database and a cheap Linux server could solve so many problems. By learning how to map logic to code, any problem could be solved with some very basic principles. Once you understood those, you just put the if statements and for loops in the right order, and a compiler would spit out the next billion dollar app.

The very first time I made a website, I remember putting some HTML and JavaScript I'd copied from Stack Overflow into a public Dropbox folder, and pointing the CNAME record of a free .tk domain to it. Dropbox would just return the raw HTML to the browser, which the browser happily displayed to the user. For a hackjob of a setup, it totally looked like the real thing! You could go to a real domain on the internet, and my own precious HTML would be rendered right there, in Internet Explorer. I felt like a genius!

Though I knew that the "real" websites out there were different. Real websites used intentional and performant code based on engineering and math, not random Stack Overflow snippets. Right?

As a surprise to no one, my Dropbox hosted website didn't last very long. If the "feature" of pointing CNAME records to dropbox.com ever was something other than a bug, Dropbox didn't consider free web hosting important for their business, and closed it down. Although I was sad to see my hacked together web server go, I wasn't surprised. I was trying to learn what the pros were doing anyway. Surely they were running on proper hardware they could control, and kept a safe distance from solutions that would break when some startup in California changed their free tier.

As I started my studies in computer science, I was looking forward to that glorious day where I would step into the real world, and see how real professionals hosted their web services. I assumed they were using nothing but `awk` and `sed` to direct incoming packets to services that ran home made TCP implementations.

Hopefully I'm getting the point across. The reality looked more like my Dropbox stack than anything else.


## Temporary solutions

At some point I understood that the proper way to do it was to let others do the heavy lifting. It's better to rely on battle tested solutions for things that are connected to the internet. It's painless, secure and reliable, and it lets me, the web developer, focus on web development.

So, over the years, I have tried several "proper" hosted solutions. Heroku, Vercel, Cloudflare Pages and Neon to name a few. But there's something in me that doesn't want to rely on them. And (in stark contrast to the rest of this post) I think that's somewhat rational. If I'm on their free tier, I know the email about pricing changes is going to come. If I'm paying, I sure hope my page doesn't go viral and empties my bank account in the process.

I can't really shake the feeling that these platforms have the same limitations as my Dropbox setup. They sell a product that's easy and cheap to get started with. What I see is a problem for my future self. I might be a pessimist, but enshittification is real, and as someone who likes to keep my ancient projects live, I've come to the conclusion that I'm not going to count on some VC funded platform that is too good a deal to be true. Not for the long run.

You've probably heard the expression "nothing is so permanent as a temporary solution". But I think we also should be saying that "*nothing is so temporary as someone else's solution*".

And although I understand why it is this way, I'm a bit sad to see that the best practice of website hosting creates a gap between the programmer and the computer. It's cheaper, more convenient, better for security and more reliable and so on, and so on, and so on...

But I can feel the itch. I want to do it on my own.


## Doing it myself

Eventually, I came to the realisation that my hobby projects don't have to follow best practices. So a while back, I decided to scratch an itch I maybe shouldn't have. This rabbit hole was _deep_. I know that whatever Vercel is charging next year won't ever pay back the time I used to make it, but it turns out, my stubbornness and spite don't need no funding.

---

**Container Cubby** is an open source container registry I built in Rust. It's made to self-host, and stores any docker containers as plain old files on a file system. It uses Linux concepts like symlinks and extended attributes instead of an off the shelf database. It's super cool, and hopefully I'll get around to writing about it some day.

https://github.com/rosvik/container-cubby

---

**Cubbyman** is a tool similar to Docker Compose I cobbled together after the registry was working. It's main purpose is to reload a set of Docker containers on a VPS once it gets the signal that one of the docker images has been updated.

https://github.com/rosvik/cubbyman

---

By running these two services, I get automatic deployment of any Docker container to any VPS independent of services like Docker Hub. When I make changes to a project, I merge a PR, and an automated build will deploy it to my VPS. It's simple in practice, tailored to my use case and free of features I don't use.

This very website has been hosted with this system for a year now, as well as all the tools I link to from [248.no](https://248.no). I host an instance of Container Cubby at [cubby.no](https://cubby.no), which, of course, hosts an image of itself. Run this command to pull an image of Container Cubby, hosted on Container Cubby.

```sh
docker pull cubby.no/rosvik/container-cubby:main
```

No tool is perfect, but Container Cubby and Cubbyman are my own. Together, they have all the features I need, and no more. If I need something more, I can add it, and maybe learn something in the process.


## Justifying my madness

I could have (and probably should have) used some open source solution that already exists out there. But I felt like Kubernetes was overkill. Coolify is nice and all, but I didn't feel comfortable offloading so much complexity into a tool I didn't understand, nor am I sure it will stay the tool I need for the next decade or so.

But more importantly, the fact that these services hide away all of the complexity involved with hosting websites, make it so that you don't actually learn anything about it. Vercel won't teach you SSH, Nginx or SSL. It might even call itself "serverless" to make you think there is no server at all.

And this has always been the point of having hobby projects for me. If hosting stuff on the internet doesn't teach me anything, I'm not sure I'll even bother hosting them. Doing it on my own is how I learn. In my experience, you learn a lot more from being bad at something, than reading a book about it.

As years went on, my server setup kept evolving, slowly building on what I learned from experience. But from professional circles, I only learned that I shouldn't. Container Cubby and Cubbyman are tools that give me the ergonomics of modern web development without losing sight of the computer it's running on. Not best practice or the most bulletproof system in the world, but that's ok.


## Do it the wrong way

As this project is getting closer and closer to a stable and usable state, I'm trying to reflect on exactly why I made it. I can think of many, but none that justifies the ungodly amount of hours I've poured into it. It's a container registry and a glorified bash script. But it does host all the side projects I've been accumulating for the last decade or so. And I think that's pretty cool!

But at the core, I think it's been more of a crusade to find that joy of doing things on my own again. It's proving to myself that I'm stubborn enough to do things the wrong way. But in a way that feels right. After long nights of building it, I can sleep well knowing that at least for this one thing, I'm free from the enshittification cycle.

Full disclaimer, **I would never actually recommend doing what I have done**. Building infrastructure from scratch is a terrible idea. Hosting is a solved problem, and as with any problem that's solved in computer science, it will be open sourced and downloaded a few billion times instead of re-implemented by naive front end developers like myself that aren't quite sure what a Docker container even is. There's no reason to reinvent the wheel. Doing everything yourself would be nothing but a counterproductive huge waste of everyone's time, less secure, slower, buggier...

But no one is stopping you, right? Maybe I am recommending it.

Go scratch that itch.
