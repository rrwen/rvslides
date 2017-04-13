# rvslides
Richard Wen  
rrwen.dev@gmail.com  
* [Template Slides](https://rrwen.github.io/rvslides/slides)

Minimalistic command line tool for templating and PDF rendering of [reveal.js](https://github.com/hakimel/reveal.js/) presentations.

```
npm install rvslides -g
rvslides create
rvslides pdf
```

## Install

1. Ensure [Node.js](https://nodejs.org) is installed
2. Install via npm:

```
npm install rvslides -g
```

For the latest developer version, see [Developer Install](#developer-install).

## Usage

Generate slides **index.html** in the current directory:

```
rvslides create
```

* Edit the **index.html** file to modify slides
* Replace the **img/logo.svg** file to change the logo

Render **index.html** slides as a PDF **pdf/index.pdf**:

```
rvslides pdf
```

For usage help, use `rvslides -h`

## Advanced Usage

### Render Portable Document File (PDF)

PDF support is based on [decktape](https://github.com/astefanutti/decktape).

* Generate *pdf/index.pdf* for *index.html* with `rvslides pdf`
* Generate a PDF with different html slides and output with `rvslides pdf path/to/slides.html path/to/slides.pdf`

## Manage JavaScript (JS) Packages

The JS packages are contained in **js/** with package management based on [bower](https://bower.io/).

* Install bower `npm install bower -g`
* Install JS packages with `bower install <package-name>`
* Update JS packages with `bower update <package-name>`
* Uninstall JS packages with `bower uninstall <package-name>`

## Developer Notes

### TO DO

* Incorporate a templating engine
* Document Github hosting
* Create unit tests

### Developer Install

1. Ensure [git](https://git-scm.com/) is installed
2. Install via git:

```
git clone https://github.com/rrwen/rvslides
cd rvslides
npm install -g
```

### Developer Maintenance

1. Update package and slide dependencies
2. Check **slides/index.html**

```
npm update --save
npm run bower update --save
```

## Implementation Notes

### PDF Support Implementation

PDF generation is based on [decktape](https://github.com/astefanutti/decktape), which requires [pre-compiled phantomjs files](https://github.com/astefanutti/decktape/releases) for different operating systems. The [npm](https://slides.npmjs.com/cli/npm) command is used to install decktape directly from the Github repository. The [node](https://nodejs.org/api/cli.html) command is then used to call **scripts/pdf/install.js** to download (via [request](https://www.npmjs.com/package/request)) the pre-compiled files. The pre-compiled files are located under *node_modules/decktape*. The **scripts/pdf** files can then be used by [node](https://nodejs.org/api/cli.html) to run decktape with `rvslides pdf`.

### JS Package Management Implementation

Client-end packages are installed and updated with [bower](https://bower.io/) inside **bower_components**. Bower is installed inside this folder to avoid an unwanted global installation, however it can be installed globally by running `npm install bower -g`. The **bower.json** file is used to specify package dependencies and [node](https://nodejs.org/api/cli.html) is used to run updates with [npm commands](https://slides.npmjs.com/misc/scripts#examples) (inside **package.json**) assigned to `npm run bower update`, `npm bower js install`, and `npm run bower uninstall`. These commands are for updating client-end packages on the developer side.

### CSS Implementation

The theme is defined by Cascading Style Sheets (CSS) inside **css**, the original [reveal.js white theme](https://github.com/hakimel/reveal.js/blob/master/css/theme/white.css), [components-font-awesome](https://github.com/components/font-awesome), and a logo file inside **img**.
