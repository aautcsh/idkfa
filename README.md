### Liber Primus Translator ###

Takes Futhark and keys to produce clear text.

Calculates IoC and matches words against a dictionary along the way.

Liber can be split by (w)ord, (c)lause, (p)aragraph (s)egment (l)ine (q)age (page).

Keys can be added as string ('divinity') or array [2, 3, 5, 7] or can be selected from ./data/oeis by name ('A010000'), index or range/offset. String keys will be added with forword/reverse offsets. Keys are padded/repeated to max-length of current chunk automatically.

Futhark is shifted up/down a forward and reverse Gematria.

Note: Keys from OEIS are sanitized and sanity checked on values given in config.js.
So 
```
#!node

O.select(0, 100)
```
 will most likely not return 100 keys.

### Setup ###

CMDline options are not yet implemented so you will have to edit main.js and run it.

$ npm install
$ node ./main.js

### Contribution guidelines ###

Pulls welcome.
Pls use tabs (width 4).

### Who do I talk to? ###

bugfixer @ freenode