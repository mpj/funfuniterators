/*
Good Monday Morning!

In last weeks video, we looked at Iterators. In this video,
we're going to look at Generators, which is a super weird
concept until you realise that Generators are just thin,
syntactic sugar to create Iterators.

I am MPJ, and you are watching Fun Fun Function!

(Intro)

Todays episode is sponsored by Tiptapp, they are currently hiring.
If you know someone that would like to work with React Native or node.js
in the heart of Stockholm, send them to tiptapp.com/fff

Let's have a look at the custom dragonArmy Iterator example
from last weeks video.
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
If you're confused during this video you should go back and watch the video on Iterators,
because you must understand Iterators in order to understand Generators. That said, I'm going to
walk through this code right now as a recap.

(Goes through the code, line by line)

By the way, if you like this inline evaluation plugin that you're seeing, it's a sponsor
of the show called Quokka - you can find it at quokka.funfunfunction.com,
that link is also in the episode description.

Now, I'm going to replace the iterator factory here with a generator:
*/

;(() => {
  const makeDragon = require('./make-dragon')

  const dragonArmy = {
    [Symbol.iterator]: function*() {
      while(true) {
        const enoughDragonsSpawned = Math.random() > 0.75
        if (enoughDragonsSpawned) return
        yield makeDragon()
      }
    },
    /*[Symbol.iterator]: () => {
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
    }*/
  }
  for (const dragon of dragonArmy) {
    dragon //?
  }

})()

/*
This generator has exactly the same effect. Just like the old function,
it creates an iterators that the for ... of loop uses to iterate the army.
The generator is the same thing, it's just a slighty terser syntax.
Let me prove it to you by consuming the iterator that the generator creates manually,
instead of using the for ... of loop:
*/

;(() => {
  const makeDragon = require('./make-dragon')

  function* someDragons() {
    while(true) {
      const enoughDragonsSpawned = Math.random() > 0.75
      if (enoughDragonsSpawned) return
      yield makeDragon()
    }
  }

  const iterator = someDragons()
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?

})()

/*
Let me make the example even simpler. (talk through the example as we go)
*/

;(() => {
  const makeDragon = require('./make-dragon')

  function* someDragons() {
    yield 'fluffykins the lighting dragon'
    yield 'waffle the time dragon'
    yield 'hardy the dog'
  }

  const iterator = someDragons()
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?

})()

/*
We can also return early here, so that hardy the dog is only with us sometimes:
*/

;(() => {
  const makeDragon = require('./make-dragon')

  function* someDragons() {
    yield 'fluffykins the lighting dragon'
    yield 'waffle the time dragon'
    if (Math.random() > 0.50) return
    yield 'hardy the dog'
  }

  const iterator = someDragons()
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?

})()

/*
I personally find it mentally helpful to think about the generator as a pausable function.
To demonstrate that, let's remove the iterator.next calls:
*/

;(() => {
  const makeDragon = require('./make-dragon')

  function* someDragons() {
    yield 'fluffykins the lighting dragon'
    yield 'waffle the time dragon'
    if (Math.random() > 0.50) return
    yield 'hardy the dog'
  }

  const iterator = someDragons()
})()

/*
Thanks to Quokka, we have code coverage here on the side, the green boxes indicate
code that was executed and the gray ones show code that was never executed.
So, notice here, that even though we call the iterator, no code in it is executed yet.

It's not until we actually call next on the iterator that stuff starts happening:
*/

;(() => {
  const makeDragon = require('./make-dragon')

  function* someDragons() {
    yield 'fluffykins the lighting dragon'
    yield 'waffle the time dragon'
    if (Math.random() > 0.50) return
    yield 'hardy the dog'
  }

  const iterator = someDragons()
  iterator.next() //?
})()

/*
Notice what happens here - when we call next, the code inside the generator starts executing,
until it hits the yield keyword, which happens to be immidiately ... maybe I should break that into
a variable to drive that point home:
*/

;(() => {
  const makeDragon = require('./make-dragon')

  function* someDragons() {
    const str = 'fluffykins the lighting dragon'
    yield str
    yield 'waffle the time dragon'
    if (Math.random() > 0.50) return
    yield 'hardy the dog'
  }

  const iterator = someDragons()
  iterator.next() //?
})()

/*
Okay, so when we call next, the generator executes until it hits a yield, and then it pauses
and whatever was yielded, in this case a string, will be the return value of the next call.

Let's call next() one more time:
*/

;(() => {
  const makeDragon = require('./make-dragon')

  function* someDragons() {
    const str = 'fluffykins the lighting dragon'
    yield str
    yield 'waffle the time dragon'
    if (Math.random() > 0.50) return
    yield 'hardy the dog'
  }

  const iterator = someDragons()
  iterator.next() //?
  iterator.next() //?
})()

/*
Same thing happens, just for the next line. We call next, the iterator yields a value, and
that value becomes the return value of the next call here.

Let's call next one more time.
*/

;(() => {
  const makeDragon = require('./make-dragon')

  function* someDragons() {
    const str = 'fluffykins the lighting dragon'
    yield str
    yield 'waffle the time dragon'
    if (Math.random() > 0.50)
      return
    yield 'hardy the dog'
  }

  const iterator = someDragons()
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?

})()

/*
  Let's break that return statement into two lines so that we can see the coverage clearly.

  So, as you see here, sometimes we get hardy the dog in the dragon gang, and sometimes it
  returns early and there is no hardy. Notice that the return terminates the generator completely,
  unlike yield which just pauses it. So when we returned early, calling next again gives us nothing,
  a generator that has returned is not paused, it's done, forever.

  So that's the gist of how generator work, but I really want to go back to my statement
  that they are just a thin syntax sugar to create iterators. There is really nothing magical
  about them. To demonstrate this, I'm going to rewrite this generator here with a normal function:

  (cmment out and then describe as we go)
*/

;(() => {
  const makeDragon = require('./make-dragon')

  /*
  function* someDragons() {
    const str = 'fluffykins the lighting dragon'
    yield str
    yield 'waffle the time dragon'
    if (Math.random() > 0.50)
      return
    yield 'hardy the dog'
  }*/

  function someDragons() {
    let iteration = -1
    const iterator = {
      next: () => {
        iteration++
        if (iteration === 0)
          return {value: 'fluffykins the lighting dragon', done: false }
        if (iteration === 1)
          return {value: 'waffle the time dragon', done: false }
        if (iteration === 2) {
          if (Math.random() < 0.50) {
            return { value: 'hardy the dog', done: true }
          }
        }
        return { value: undefined, done: true }
      }
    }
    return iterator
  }

  const iterator = someDragons()
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?

})()

/*

So, as you can see here, there is nothing magical about a generator,
we can always do what a generator does using a normal function that returns an
iterator, but generators are still great because the code is a lot
more terse and reads a bit easier than creating iterators manually.

We've looked at Iterators and Generators, but we're still just scratching the surface.
Iterators can be consumed by other things than the for ... of loop, iterators can be asyncronous,
generators can be asyncronous, the for ... of loop can asyncronous. There is so much cool stuff we
could learn here, if you're interested. Please post a comment down below about what you want
to hear more about.

You have just watched an episode of Fun Fun Function. I release new videos every monday morning
08:00 GMT. If you are forgetful, you can subscribe here, so that you don't miss it,
or watch another episode right now by clicking here.

I am MPJ, until next monday morning, stay curious.

*/