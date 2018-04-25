# wp-Casper

Take a look at the latest default theme for [Ghost](http://github.com/tryghost/ghost/), Casper.

___

![](https://howardlucas.io/post-images/wp-casper/wp-casper-header.jpg)

____

# Introduce theme?

This theme is an _html_ version of __Casper__ theme ready to be turned into a WordPress theme __wp-Casper__. At the moment this is a private theme for [howardlucas.io](https://howardlucas.io/), but hopefully will be a general WordPress theme in the near future. [howardlucas.io](https://howardlucas.io/) will run off a child theme of wp-Casper.

> A preview of the Casper html theme can be seen [here](https://howardlucas.io/themes/casper-html/)

# Classes

### Tables
As well as the normal tables the theme offers some variations with classes:
+ table-bordered
+ table-striped
+ table-condensed

### Full page images
Full page images are achieved with the following markdown `#full`

```markdown
[img](some/image/file.jpg#full)
```

### Other Images

There are two other image classes:

+ img-framed
+ img-circle

# Floating Header

The floating header is set to use a logo image or site title but not both. You can use both but results will be crowded header

# Prism
Prism is an alternative code to Google code. The theme has a copy of the js and css files in the theme. Call using

    <pre><code class="langauge-css">
    header {
        font-size: 2.3rem;
        color: #333333;
        margin-top: .4rem;
    }
    </code></pre>


Change the css for the required code type.


# Notes
Look into class `no-image` in the headers - no-image removes the featured image and the figure tags

# Copyright & License

Copyright (c) 2009-2018 howardlucas.io - Released under the [MIT license](LICENSE).
