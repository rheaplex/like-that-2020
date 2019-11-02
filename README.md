"Like That 2020" (2019), Rhea Myers, JavaScript.

Licensed under the GNU General Public License Version 3 or (at your option) any
later version.

# What Is This?

This is the not-quite 25th anniversary edition of "Like That". Which was a
Generative Art meditation on perception and aesthetics heavily influenced by
late 20th century British art.

"Like That" was first implemented using QuickDraw 3D and Metrowerks CodeWarrior
C++ on Power Macintosh. It was later ported to Processing and then expanded as
"Like That Generally" using Processing with SBCL Common Lisp for the build
system.

"Like That 2020" uses JavaScript exclusively, embedded in web pages to display
the works and as a node.js script to build them.

# How Do I Use It?

Open build/index.html in a modern web browser, set the page to full-screen,
and select the link to the work you want to view.

You don't need to run the build system, but if you want to just run:

    npm run build

To exhibit one of the pieces, create a shell script that launches a web
browser full screen displaying the relevant html page at system startup. Be
wary of screensavers, power saving, and pop-up notifications when doing so.

# How Does The Build System Work?

The generate.js script contains a list of work specs. It concatenates the JS,
fragments for these specs, wraps them in a JS header and footer, expands the
HTML page template with it, and writes it as an index.html file into the build
directory in a subdirectory named for the work.

It then builds an index page linking to each of the work pages and writes that
as the index.html of the build directory.
