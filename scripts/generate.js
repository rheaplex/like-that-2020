/* global __dirname require */
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../source');
const BUILD_DIR = path.resolve(__dirname, '../build');
const OUT_PAGE = 'index.html';
const LIST_PAGE = path.join(BUILD_DIR, 'index.html');
const THREE_SRC_FILE = path.join(SRC_DIR, '3d', 'three.min.js');
const THREE_BUILD_FILE = path.join(BUILD_DIR, 'three.min.js');
const BULMA_SRC_FILE = path.join(SRC_DIR, 'bulma.min.css');
const BULMA_BUILD_FILE = path.join(BUILD_DIR, 'bulma.min.css');

const APPEARANCE_DIR = path.join(SRC_DIR, 'appearance');
const FORM_DIR = path.join(SRC_DIR, 'form');
const BEHAVIOUR_DIR = path.join(SRC_DIR, 'behaviour');
const SEQUENCE_DIR_2D = path.join(SRC_DIR, '2d', 'sequence');
const SEQUENCE_DIR_3D = path.join(SRC_DIR, '3d', 'sequence');

const BEFORE_JS = fs.readFileSync(path.join(SRC_DIR, 'before.js')).toString();
const AFTER_JS_2D = fs.readFileSync(path.join(SRC_DIR, '2d', 'after.js'))
      .toString();
const AFTER_JS_3D = fs.readFileSync(path.join(SRC_DIR, '3d', 'after.js'))
      .toString();
const PAGE_2D_HTML = fs.readFileSync(path.join(SRC_DIR, '2d', 'page.html'))
      .toString();
const PAGE_3D_HTML = fs.readFileSync(path.join(SRC_DIR, '3d', 'page.html'))
      .toString();
const LIST_PAGE_HTML = fs
      .readFileSync(path.join(SRC_DIR, 'list.html'))
      .toString();

// Keys are slugs / basenames for files

const WORKS = {
  "ghosts": ["white", "cube", "burst", "sequential"],
  "seance": ["white", "cube", "cluster", "sequential"],
  "aesthetics": ["black", "cube", "burst", "sequential"],
  "citizens": ["polychrome", "cube", "burst", "sequential"],
  "come_together": ["polychrome", "cube", "cluster", "sequential"],
  "architecture": ["neoplastic", "cube", "burst", "sequential"],
  "society": ["neoplastic", "cube", "cluster", "sequential"],
  "monopoly": ["transparent_black", "cube", "burst", "sequential"],
  "ideology": ["transparent_black", "cube", "cluster", "sequential"],
  "structure": ["transparent_polychrome", "cube", "burst", "sequential"],
  "psychogeography": ["transparent_polychrome", "cube", "cluster",
                      "sequential"],
  "congress": ["flesh", "cube", "burst", "sequential"],
  "dance": ["flesh", "cube", "cluster", "sequential"],
  /*"subjects": ["white", "square", "burst", "sequential"],
  "logistics": ["white", "square", "cluster", "sequential"],
  "sometimes": ["white", "circle", "burst", "sequential"],
  "moments": ["white", "circle", "cluster", "sequential"],
  "market": ["black", "cube", "cluster", "sequential"],
  "empire": ["black", "square", "burst", "sequential"],
  "cliques": ["black", "square", "cluster", "sequential"],
  "epidemic": ["black", "circle", "burst", "sequential"],
  "cool": ["black", "circle", "cluster", "sequential"],
  "fashion": ["polychrome", "square", "burst", "sequential"],
  "opinions": ["polychrome", "square", "cluster", "sequential"],
  "scene": ["polychrome", "circle", "burst", "sequential"],
  "show": ["polychrome", "circle", "cluster", "sequential"],
  "systems": ["neoplastic", "square", "burst", "sequential"],
  "design": ["neoplastic", "square", "cluster", "sequential"],
  "transgression": ["neoplastic", "circle", "burst", "sequential"],
  "normativity": ["neoplastic", "circle", "cluster", "sequential"],
  "laws": ["outline", "square", "burst", "sequential"],
  "obligations": ["outline", "square", "cluster", "sequential"],
  "crime": ["outline", "circle", "burst", "sequential"],
  "dissent": ["outline", "circle", "cluster", "sequential"],
  "uniform": ["transparent_black", "square", "burst", "sequential"],
  "customs": ["transparent_black", "square", "cluster", "sequential"],
  "philosophy": ["transparent_black", "circle", "burst", "sequential"],
  "happening": ["transparent_black", "circle", "cluster", "sequential"],
  "objects": ["transparent_polychrome", "square", "burst", "sequential"],
  "commodities": ["transparent_polychrome", "square", "cluster", "sequential"],
  "eventual": ["transparent_polychrome", "circle", "burst", "sequential"],
  "happenstance": ["transparent_polychrome", "circle", "cluster", "sequential"],
  "mufti": ["flesh", "square", "burst", "sequential"],
  "party": ["flesh", "square", "cluster", "sequential"],
  "relational": ["flesh", "circle", "burst", "sequential"],
  "gossip": ["flesh", "circle", "cluster", "sequential"]*/
};

const loadImplementations = (dirname) => {
  const impls = {};
  const files = fs.readdirSync(dirname);
  files.forEach(file => {
    impls[path.parse(file).name] = fs
      .readFileSync(path.join(dirname, file))
      .toString();
  });
  return impls;
};

const APPEARANCES = loadImplementations(APPEARANCE_DIR);
const FORMS = loadImplementations(FORM_DIR);
const BEHAVIOURS = loadImplementations(BEHAVIOUR_DIR);
const SEQUENCES_2D = loadImplementations(SEQUENCE_DIR_2D);
const SEQUENCES_3D = loadImplementations(SEQUENCE_DIR_3D);

const workDirPath = workName => path.join(BUILD_DIR, workName);

const workPagePath = workName => path.join(
  BUILD_DIR,
  workName,
  OUT_PAGE
);

const workIs3d = spec => FORMS[spec[1]].match(/Like\s+That:\s+3d/);

const sequenceJsForForm = (sequence, is3d) => {
  if (is3d) {
    return SEQUENCES_3D[sequence];
  } else {
    return SEQUENCES_2D[sequence];
  }
};

const afterJsForForm = (form, is3d) => {
  if (is3d) {
    return AFTER_JS_3D;
  } else {
    return AFTER_JS_2D;
  }
};

const htmlForWork = is3d => {
  if(is3d) {
    return PAGE_3D_HTML;
  } else {
    return PAGE_2D_HTML;
  }
};

const buildWorkJS = (spec, is3d) => {
  const app = APPEARANCES[spec[0]];
  const form = FORMS[spec[1]];
  const behav = BEHAVIOURS[spec[2]];
  const after = afterJsForForm(spec[1], is3d);
  const seq = sequenceJsForForm(spec[3], is3d);
  return `${BEFORE_JS}\n${app}\n${form}\n${behav}\n${seq}\n${after}`;
};

const capitalize = workName => workName
      .split('_')
      .map(word => word[0].toUpperCase() + word.substr(1))
      .join(' ');

const buildWorkPage = (workName, spec, is3d) => `${htmlForWork(is3d)}`
      .replace('{{title}}', capitalize(workName))
      .replace('{{script}}', buildWorkJS(spec, is3d));

const buildWork = workName => {
  const spec = WORKS[workName];
  const is3d = workIs3d(spec);
  fs.mkdirSync(workDirPath(workName), { recursive: true });
  fs.writeFileSync(workPagePath(workName), buildWorkPage(workName, spec, is3d));
};

const buildListPage = list => {
  fs.writeFileSync(LIST_PAGE, LIST_PAGE_HTML.replace('{{list}}', list));
};

const buildWorks = () => {
  let list = '';
  Object.keys(WORKS).forEach(workName => {
    console.log(workName);
    buildWork(workName);
    list += `    <p><a href="${workPagePath(workName)}">${capitalize(workName)}</a> (${WORKS[workName].join(', ').replace('_', ' ')})</p>\n`;
  });
  buildListPage(list);
  fs.copyFileSync(THREE_SRC_FILE, THREE_BUILD_FILE);
  fs.copyFileSync(BULMA_SRC_FILE, BULMA_BUILD_FILE);
};

buildWorks();
