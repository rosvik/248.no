<!-- Copyright © 2026 Johannes Røsvik -->

I'm a bit of a hobby project-holic. For as long as i can remember, I've had some sort of tinkering project going on in addition to whatever I was supposed to be doing. I find the process of chasing down that idea you got that one time you were doing something that had a bit too much friction. A while back, I built a QR code generator website, because the one site I had used for years started to take $5 a month for SVG exports. There really is something so satisfying about *scratching that itch*. I know that $5 a month won't ever pay back the time I used making it, but it turns out, my stubbornness and spite don't need no funding.


## Building a house of cards

When I initially got into programming, I fell in love with the idea that a couple of PHP scripts, a MySQL database and a cheap computer in a datacenter could solve so many problems. By learning how to map logic to code, any problem could be solved from basic principles. It seemed that all I needed was some time and expertise to build the next billion dollar app. Surely you could just put the if statement and for loops in the right order, and you're there.

The very first time I made a website, I remember putting some HTML and JavaScript I'd copied from Stack Overflow in a public Dropbox folder, and pointing the CNAME record of a free .tk domain to it. It totally looked like the real thing! You could go to a real domain on the internet, and the HTML would be rendered right there, in Internet Explorer. I felt like a genius, though I knew the real websites out there were different. Real websites used real programming languages like PHP, and wouldn't break when some startup in California inevitably changed their free tier.

Of course, at some point realized that the "proper" way to do it was to let others do the heavy lifting. It's better to rely on battle tested solutions for things that are connected to the internet. It's painless, secure and reliable, and it lets me, the web developer, focus on web development.

Obvioulsly, my Dropbox hosted website didn't last very long. If the "feature" of pointing CNAME records to dropbox.com ever was something other than a bug, Dropbox didn't consider free web hosting important for their business, and closed it down. Although I was sad to see my hacked together web server go, I wasn't surprised. I was trying to learn what the pros were doing anyway. Surely they were running on proper hardware could controll, and kept a safe distance from free tiers and of companies with unclear business models.


## Someone else's solution

Over the years, I have tried several "proper" hosted solutions. Heroku, Vercel, and Neon to name a few. But there's something in me that doesn't want to get invested. And (in stark contrast to the rest of this post) I think that's somewhat rational. If I'm on their free tier, I know the email about pricing changes is going to come. If I'm paying, I sure hope my page doesn't go viral and empties my bank account in the process. Is using these platforms that different from how I used Dropbox?

These platforms sell a product that's easy and cheap to get started with. But what I see, is a problem for my future self. I might be a pessimist, but enshittification is real, and as someone who like to keeping my dormant projects live, I've come to the conclusion that I'm not going to count on some VC funded service that's too good a deal to be true.

You've probably heard that nothing is so permanent as a temporary solution. But I think we also should come to terms with the fact that *nothing is so temporary as someone else's solution.*

So it turns out reality looks more like my Dropbox stack than what young and naive me imagined the internet would look like. Dropbox had been replaced by Vercel, otherwise not much has changed. Although I understand why it's become like this, I'm sad that the best pracice of website hosting doesn't seem to a be a very sustainable option.


## My solution

Luckily, I've come to realise that no one is saying that my hobby projects has to follow best pratices. So a while back, I decided to scratch an itch I maybe shouldn't have.

I know that whatever Vercel is charging next year won't ever pay back the time I used making it, but it turns out, my stubbornness and spite don't need no funding.

**Container Cubby** is an open source container registry built in rust. It's made to self-host, and supports only one user per installation.

**Cubbyman** is an open source alternative to Docker Compose. It is also built in rust, and set up to pull and start containers on a VPS.

By hosting these two services, I get automatic deployment of any Docker container to any VPS independent of services like Docker Hub. It's simple in theory, tailored to my use case and free of features I don't use.

This very page has been hosted with this system for a year now.

I could have (and probably should have) used some open source solution that already exists out there. But I felt like Kubernetes was overkill. Coolify is cool and all, but I didn't feel comfortable offloading so much complexity into a tool I didn't understand, nor am I sure it will stay the tool I need for the next decade or so.

Container Cubby and Cubbyman are my own. If I need more features, I add them without having to inherit a massive codebase from someone else.


## Justifying my madness

But more importantly, the fact that these services hide away all of the complexity involved with hosting websites, make it so that you don't actually learn much about hosting. And this has always been a major argument for having hobby projects for me. If hosting stuff on the internet doesn't learn me anything, I'm not sure I'll even bother hosting them.

Doing it on my own is how I learn. I think I've learned more about security by being terrible at it, than I did while taking my masters degree.

Ever since those glorious days of Dropbox-hosted websites, I've been chasing that image of "real" web development. I learned how Linux web servers worked. SSH. Nginx. SSL. I even managed to learn a bit of PHP before I learned that it wasn't cool anymore. As I started studying computer science, I was looking forward to that glorious day where I would step into the real world, and see how real professionals hosted their web services. I assumed they were using nothing but awk and sed to direct incoming packets to services that ran home made TCP implementations. The reality, of course, looked more like my Dropbox stack than anything else.


## Do it the wrong way

As this project is getting closer and closer to a usable state, I'm trying to reflect on exactly why I made it. I can think of many, but none that justifies the ungodly amount of hours I've poured into it. It's a container registry and a glorified bash script. But it hosts all the side projects I've been accumulating for the last decade or so. And that's pretty cool!

But to me it's been more of a crusade to find that joy of doing things on my own. It's proving to myself that I'm stubborn enough to do things the wrong way. But doing it in a way that feels right.

I would never actually recommend doing what I am, and building your infrastructure from scratch. Hosting is a solved problem, and as with any problem that's solved in computer science, it will be open sourced and copied a few billion times instead of re-implemented by naive front end developers like myself, that aren't quite sure what a Docker container even is. There's no reason to reinvent the wheel. Doing everything yourself would be nothing but counterproductive, a huge waste of everyone's time, less secure, slower, buggier...

But no one is stopping you.
