##restdoccer

Restdoccer is an API documentation tool.

##### Installation

npm:

```
npm install restdoccer -g
```

git:

```
git clone https://github.com/SomeoneWeird/restdoccer.git
cd restdoccer
npm install
npm link
```

##### Usage

```
Usage: node ./restdoccer.js --apis [filename] --info [filename]

Options:
  --apis        File containing API JSON.   [required]
  --info        File containing info JSON.  [required]
  --output, -o  Output file               
  --minify, -m  Minify HTML output          [default: true]
```

##### Example

See [http://someoneweird.github.io/restdoccer/](http://someoneweird.github.io/restdoccer/) for example output (may be uh, _very_ outdated...)

See [example.json](https://github.com/SomeoneWeird/restdoccer/blob/master/example.json) for an example configuration.

##### License


> The MIT License (MIT)

>Copyright (c) 2013 Adam Brady

>Permission is hereby granted, free of charge, to any person obtaining a copy of
>this software and associated documentation files (the "Software"), to deal in
>the Software without restriction, including without limitation the rights to
>use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
>the Software, and to permit persons to whom the Software is furnished to do so,
>subject to the following conditions:

>The above copyright notice and this permission notice shall be included in all
>copies or substantial portions of the Software.

>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
>FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
>COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
>IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
>CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
