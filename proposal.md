# "Software" Proposal | Round 2

--- Jasper Travers

Round 2

The name "computer" is an accident of history. "If there had been a lot of energy and money invested in [theatre marquees] control boxes, the device they would have come up with would be identical to todays computer" [1]. Instead we had a war, and the need for calculating balistic tables - and so general purpose machines were developed for computation which yielded the misnomer: "Computer". 

The most interesting thing about the personal computer today is the screen and what we do with it. It is interesting to discuss the screen in comparison to paper. They do similar things - allowing users to ... // blah. bad writing here ...

Portability aside - the most interesting difference between paper and screens are the affordences each has for transformation. Paper can be folded, it can take drawings or text or art with no *change* on the part of the author other than intention. When sketching out plans or notes an author can include every relevant representation at once - with text descriptions alongside diagrams and drawings. A tree or piece of oragami can be idly expressed while sitting at the beach, absorbing a lecture or reflecting on a script ... //again way too long winded ...

... while a screen has cut and paste. Resizing and re-formatting. It allows things to be saved out of sight and brought back at a moments notice. A misspelled word *already typed* changes its visual state to indicate the authors mistake - and it can be fixed in place. No erasers, or starting over on a new card. Mistakenly drawn lines can be undone and colors changed after laying them down. Yet while all these abilities are fine enough when considered in the context of what abilities a typist or artist had with just pen and paper - more interesting is the idea of layers.

Layers are most commonly known in CAD applications. Authors can focus and act on specific parts of their design at a time. A graphic artist can *just* be working on the hair of their character - without worrying about smudging its face, an architect can specify the form and layout of a foundation after sketching the walls, and a writer can switch between the outline and full text of their paper at their whim.

Or can they? That last example is not like the others. Layers are not thought about so much in the arena of writing, yet spell check is a perfect example as hinted at earlier. It is a persistent feature which can act upon any text in a document in a number of ways (autocorrect vs visual indication) and it can be toggled on or off. Take a moment to think about this ability of screens to transform information between various states of representation. We actually have a bunch of them for writing tools: Search and replace, an outline tab, comments. But could there not be so many more? CAD tools for architects or artists have incredible organizational features, so should writing, as so *does* writing.

Programmers can put comments in their code. This is text on the screen, in the file, which has no effect on the output. Conventional college student writing tools (MS Word, Apple Word, Google Docs) has no concept of the most basic programming organization - comments. 





---

Ted Nelson

"The computer is an absolutely basic invention that could have developed from the flashing light controller used on motion picture marquees. It happens that it developed out of calculating machines and that's only for historical reasons that during the war they had to calculate the trajectories of large bullets.

If theyre had been a lot of energy and money invested on these control boxes, the device they came up with would be identical to todays computer. The point is that it is a completely general object and has no commitment to numerical uses. The numerical use of the computer is as the entertainment use of the computer. It is a totally general object. suitible for use as communication devices, for music performance. For making pictures. For controlling projects. for controlling blinking lights in times square.

Computer is a misnomer. The correct name is the all purpose machine. That's what von Neumen called it."

Bibliography:

1. [Ted Nelson on Screens](https://www.youtube.com/watch?v=RVU62CQTXFI&t=789s)



# "Software" Proposal | version 0.0

--- Jasper Travers

The origin of the idea is: vim/emacs/whatever tool ever are always way too hard to setup, kindof ship as unfinished intentionally - which is great for people like me who know they want to fiddle with things, but terrible for people who don't know how to fiddle and/or don't have the time to. So a cool remedy would be if you could setup some defaults to "ship" one of these tools (emacs with org-mode) as a fully setup and dead-simple writing tool. That's my goal. Ship emacs as a ready-to-go out of the box and looking nice. That'd actually be the first pitch. To be [Typora](https://typora.io/) straight up. But then expose just the smallest bit of [Helm](http://tuhdo.github.io/helm-intro.html) and a few good ideas for why emacs is more powerful than Typora (see below).

So, goals:
1. Serve a more beautiful writing environment than word/googledocs.
2. Bring the power of a computer into writing at a very, very controlled and non-intrusive rate

If you look at the left pane in the little 30s video on this [page](https://lepisma.github.io/2017/10/28/ricing-org-mode/index.html) you get a sense of the beauty of writing in emacs orgmode (specifically this bloggers personal "White Room" layer called Rogue. Links:
- [emacs](https://www.gnu.org/software/emacs/)
- [org mode](https://orgmode.org/)
- [spacemacs](http://spacemacs.org/)
- [Rogue](https://lepisma.github.io/2017/10/28/ricing-org-mode/index.html)

There are a few things to go through here. My target output product would be a piece of software + a guide to go alongside + the philosophy of computing.
The software would be emacs < spacemacs < org mode < Rogue layer; meaning, I would really just be shipping a preconfigured emacs package. And it would be -- specifically -- the Rogue layer on top of org mode on top of the spacemacs configuration package on top of emacs. Or, as above, emacs < spacemacs < org mode < Rogue layer. 
Last thing towards the first goal of beautiful: WhiteRoom is an old MacOS application which was literally just a white "window" of an application which allowed you to write in it. So it was a simple distractionless writing application. That's part of the goal, to remove menu bars on menu bars, and just go with simple.

Part 2, the more interesting part. And we'd only ever get there if part 1 was done successfully (imo, would be an interesting conversation though). Part 2 is bringing programming, plain text manipulation and computability, etc. to non-programmers. My primary user here is my younger brother Ben, who is a sociology major in Portland right now. Would he use this setup? Why? What would he want it to do? Links again:

- [Emacs for Writers](https://www.youtube.com/watch?v=FtieBc3KptU&t=3016s)
>  Talk by a non-programmer who uses emacs org mode for writing.
- [2008 Google Tech Talk on Org mode](https://www.youtube.com/watch?v=oJTwQvgfgMM)
>  The author of the package and some of the incredible things it simplified about writing things in plaintext.
- [Keyboarding](https://lepisma.github.io/2017/08/25/keyboard/index.html)
> The point of being good at/using keyboards. tl;dr it has NOTHING to do with speed. Everything to do with communication with the computer. (a fat breath of fresh air after so many hn and reddit comment sections recommending vim because it's "faster")

Some ideas I've had about why one might want a programming environment such as emacs instead of word or googledocs for writing
- Folding sections of text (making them hidden, but not gone)
- The general real of being able to "ask any question you like" of the text you're writing
  How often are certain words used; custom abreviation expansions; timers of anything; which phrases are most common in your writing (most common n-length strings); etc. anything that a parsing program could uncover in writing.
- vcs
- inline "versions" of paragraphs with differences show in a nice diff highlighting
- search across project (ie. search across all papers in a given class or sequence of classes)
- I need more good, solid reasons. Please contact me if you have any ideas!

I'm beginning to get tired and losing focus.

The dream is to bring composibility and the simple power of computers and well designed computing environments to anyone who wants to have that. With no barrier (Typora just "works" even if you don't know any of its features (awknoledged requirement is knowing markdown)), whereas you can't even begin to use vim without really knowing it or having a solid chunk of time to invest which is just irresponsible to ask of/push on other people.

If simply covering the use case of word/googledocs was able to be done in emacs the rest would simply come. A user could be fine with using zero new features for a year, then learn what piques their interest as they have the time to do so. Hopefully eventually leading to a state where they don't use unwieldy software like word, and instead have their own powerful tool that they or a community of active developers (hello, emacs ecosystem) could build for them.

As it stands, org mode is incredibly powerful, and built entirely with simplicity in mind. Throw spacemacs with helm in and you've got a commandline brough up at a keystroke which can run any function in the entire system. You want to export your essay to html to throw up on a site? boom done. You want it printed? easy. pdf to share? all options in the same place. org mode is an incredible starting point for this idea of a simple zero-knowledge yet fully functioning WhiteRoom. As well as the foundation piece for my philosophy on what I see it to mean for people to be "able to use a computer".


I will revise this document. Hope you enjoyed reading it, please shoot any and all thoughts my way.


-- Jasper


---


"Software" Proposal | version 0.1

--- Jasper Travers

Meta response to v0.0

links I used:
[Typora](https://typora.io/)
[Helm](http://tuhdo.github.io/helm-intro.html)
3x[Ricing up Org Mode](https://lepisma.github.io/2017/10/28/ricing-org-mode/index.html)
[emacs](https://www.gnu.org/software/emacs/)
[spacemacs](http://spacemacs.org/)
[org mode](https://orgmode.org/)
[Emacs for Writers](https://www.youtube.com/watch?v=FtieBc3KptU&t=3016s)
[Google Tech Talk Org-Mode by Author](https://www.youtube.com/watch?v=oJTwQvgfgMM)
[The Point of Keyboarding](https://lepisma.github.io/2017/08/25/keyboard/index.html)




