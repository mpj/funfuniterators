/*
Good Monday Morning!

Today, we're going to talk about Iterators in JavaScript. Iterators are what
the for ... of loop uses when iterating over an Array, but the for ... of loop
can actually iterate over anything, Strings, Maps, Set or your own custom objects, as
long as those objects provide an Iterator.

I am MPJ, and you are watching Fun Fun Function.

(intro)

Black: Why should I care about Iterators? Why are they in JavaScript?

White: I'm going to talk about why it's good to understand iterators in a bit, but
let's first spend a little bit of time with some code to get a sense *what* they are first:
*/

;(() => {
  const dragons = [ 'cool dragon', 'angry dragon', 'nasty dragon' ]
  for (const dragon of dragons) {
    dragon
  }
})()

/*

(Talks through the code quickly)

Let me start Quokka so that we can see what this does when executed.

(Starts Quokka)

Quokka is this great little plugin that provides inline evaluation of your JavaScript. You've seen
me use Quokka a lot in Fun Fun Function videos, just because I think it's a great tool, but
this episode is actually graciously sponsored by Quokka, so as thanks for supporting the show,
I'm going to show it off a little extra. If you want to check it out, go to quokka.funfunfunction.com,
that link is also in the episode description.

Anyway, as you see here, dragon is set to cool dragon on the first loop, angry dragon on
the second loop, and so on. It's a loop.

Black: How does for ... of know how to loop the array.
Yellow: for ... of doesn't know anything about Arrays. The reason for ... of can go
through the Array is because the Array provides an Iterator that tells for ... of how to iterate it.

Drawing: Iterator in between for...of and array.

So under the hood, how does for ... of ask dragons for it's iterator? Let's have a look:
*/

;(() => {
  const dragons = [ 'cool dragon', 'angry dragon', 'nasty dragon' ]

  const iterator = dragons[Symbol.iterator]()
  iterator

  for (const dragon of dragons) {
    dragon
  }
})()

/*
In order to get the iterator of dragons, we call the iterator method on
the dragons array, which gives us the iterator.

Red: What is that? Symbol.iterator? That's scary because it's new.

White: Yeah, If you haven't seen Symbols before, this might look a little strange. Symbols is another
new feature in JavaScript. They are common in many other programming languages,
they are basically completely unique keys.

Yellow: Symbols are great! If Symbols didn't exist, JavaScript designers would have had to do
something like dragons.___iterator___() instead, in order to have an method name obscure enough to
not be in conflict with other object properties. However, since Symbol.iterator is not a string
or name, but a unique reference, there can be no conflict.

White: Anyway, the iterator that is returned by calling this function is expected to have one method,
next. If I just type iterator.next() here Quokka won't evaluate it ...*/

;(() => {
  const dragons = [ 'cool dragon', 'angry dragon', 'nasty dragon' ]

  const iterator = dragons[Symbol.iterator]()
  iterator.next()

  for (const dragon of dragons) {
    dragon
  }
})()

/*
...but I can use Live Comments which is a feature in the Pro (paid) version of Quokka:
 */

;(() => {
  const dragons = [ 'cool dragon', 'angry dragon', 'nasty dragon' ]

  const iterator = dragons[Symbol.iterator]()
  iterator.next() //?

  for (const dragon of dragons) {
    dragon
  }
})()

/* So as we see here, the next method of the iterator returns an object that has a property called
value, that contains the first value of the array, cool dragon, and a property called done which
is a boolean set to false.

Hmmm. Okay. Let's call iterator.next() a few more times and see what happens.
*/


;(() => {
  const dragons = [ 'cool dragon', 'angry dragon', 'nasty dragon' ]

  const iterator = dragons[Symbol.iterator]()
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?

  for (const dragon of dragons) {
    dragon
  }
})()

/*

So you can see here that calling next repeatedly gets us the next item in the
array, until there are no items left, and then we get an object where done is true.
What he just did here manually is that the for ... of loop does under the hood.

So that's what the iterator interface or contract or whatever you like to call it looks
like - array basically returns this object that we can keep calling next on to get stuff
until the array is out of stuff.

Black: But WHY iterators? Why have this extra contract, interface, this protocol between
for ... of and Array?

(Drawing)

Green: The reason that this is an interface is so that we can iterate many other things than arrays -
in JavaScript, Strings, Sets, Maps, the DOM NodeList, all provide iterators so that we can
loop them in for ... of. However, we can also make our own custom object iterable - let me
show you how to do that.

First, I'm going to write some base example code that doesn't have anything to do with
iterators at all:
*/

;(() => {

  const randomNumber = require('random-number')

})()

/* Okay oops, we don't have that npm module installed yet. There is actually a
quick install function in quokka, which is really handy. (does that, keeps typing) */

;(() => {

  const randomNumber = require('random-number')

  function randomItem(array) {
    const randomIndex = randomNumber({
      min: 0,
      max: array.length - 1,
      integer: true
    })
    return array[randomIndex]
  }

  const makeDragon = () => {
    const dragonSizes = [ 'big', 'medium', 'tiny' ]
    const dragonAbilities = [ 'fire', 'ice', 'lightning']
    return  randomItem(dragonSizes) + ' ' +
            randomItem(dragonAbilities) + ' ' +
            ' dragon'
  }

  makeDragon() //?
  makeDragon() //?
  makeDragon() //?
  makeDragon() //?

})()

/*
(talks through the code)
This randomItem function here doesn't really need to be in the same file here. We understand
from it's name what it does and it's distracting us a bit so let's extract it out into another file:
*/

;(() => {

  const randomItem = require('./random-item')

  const makeDragon = () => {
    const dragonSizes = [ 'big', 'medium', 'tiny' ]
    const dragonAbilities = [ 'fire', 'ice', 'lightning']
    return  randomItem(dragonSizes) + ' ' +
            randomItem(dragonAbilities) + ' ' +
            ' dragon'
  }

  makeDragon() //?
  makeDragon() //?
  makeDragon() //?
  makeDragon() //?

})()

/* (talk about how we not need to install the npm module on a project level, does that)
You know what, I'm in an extracting mood, let's extract out makeDragon as well, we know
what it does, we don't need to see the internals right now:
*/

;(() => {

  const makeDragon = require('./make-dragon')

  makeDragon() //?
  makeDragon() //?
  makeDragon() //?
  makeDragon() //?

})()

/*
By the way, using project files like this, that's a Quokka Pro feature. NPM modules
you can use in the free version, but local project files, for that you need pro. By the
way, Quokka will monitor the external files for changes, so if I open up make-dragon side by side
here and change it, you'll see that my main file re-evaluates automatically (adds a "time" dragon)

Anyway, let's implement an iterator now. I'm going to create a dragonArmy that
provides an iterator, which keeps generating a few dragons and then randomly ends
because dragon armies are fickle, you don't know how many will show up.
*/

;(() => {
  const makeDragon = require('./make-dragon')
  const dragonArmy = {
    [Symbol.iterator]: () => {
      return {
        next: () => {
          const enoughDragonsSpawned = Math.random() > 0.75
          if (!enoughDragonsSpawned)
            return {
              value: makeDragon(),
              done: false
            }
          return { done: true }
        }
      }
    }
  }
  for (const dragon of dragonArmy) {
    dragon
  }

})()

/*
(explains the code)

So as you see here, you can play around quite a bit with an iterator. We don't need
to have this container with a predefined set of items like an array, we can generate the items
on the fly, and we're also not limited to a certain length, we can just decide suddenly
that we are done.

Green: You can create your own iterable collections which can behave in any crazy way you like.
And we are actually just scratching the surface here, iterators can actually be asyncronous,
which allows us to create iterators that gradually fetch data from an api over the network,
for example.  You might also have heard of the concept of generators in JavaScript. Generators
are actually just a thin syntatic sugar on top of Iterators, and generators are much easier to
grasp if you grasp iterators.

That's iterators! If something about this video confused you, great, that means you're learning,
ask a question down below or on the Fun Fun Forum and I or one of your fellow viewers will come to
your aid.

Thank you so much for Quokka for supporting the show. If you're interested in trying Quokka,
just go to quokka.funfunfunction.com - that link is also in the episode description. Quokka community
is free, and the pro version is just $50 bucks BUT you should never pay for your own tooling, your
employer will almost always pay for tools if you ask them because they benefit massively from anything
that makes you even slightly more productive. Again, quokka.funfunfunction.com, check them out.

You have just watched an episode of Fun Fun Function. I release new videos every monday morning
08:00 GMT. If you are forgetful, you can subscribe here, so that you don't miss it,
or watch another episode right now by clicking here.

I am MPJ, until next monday morning, stay curious.

*/

