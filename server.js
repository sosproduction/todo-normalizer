var express = require('express');
var babelify = require('express-babelify-middleware');
var Immutable = require('immutable');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var tasks = Immutable.List();
var projects = Immutable.List();

projects = projects.push(
  Immutable.fromJS({
    id: 1,
    name: 'Art',
    status: 1
  }),
  Immutable.fromJS({
    id: 2,
    name: 'Music',
    status: 0
  })
);

tasks = tasks.push(
  Immutable.fromJS({
    id: 1,
    body: 'This is an art todo',
    status: 1,
    projectId: 1
  }),
  Immutable.fromJS({
    id: 2,
    body: 'This is a music todo',
    status: 1,
    projectId: 2
  })
);

app.use('/bundle.js', babelify('./src/index.js'));
app.use(express.static('public'));
app.listen(3000, function(error) {
  if(error) {
    console.error(error);
  } else {
    console.info('Open up http://localhost:3000/ in your browser');
  }
});

app.get('/projects.json', function(req, res) {
  res.json({projects: projects.map((project) => { return { project: project.toJS() }; })})
});

app.get('/tasks.json', function(req, res) {
  res.json({
    tasks: tasks.map((task) => {
      var project = projects.find((project) => { return task.get('projectId') === project.get('id'); });
      return { task: task.merge({project}).toJS() };
    })
  });
});

app.post('/tasks.json', function(req, res) {
  var lastElem = tasks.get(-1);
  var nextId = lastElem.get('id') + 1;
  var newTask = Immutable.fromJS({
    id: nextId,
    body: req.body.body,
    status: 1,
    projectId: req.body.projectId
  });
  tasks = tasks.push(newTask);
  var project = projects.find((project) => { return newTask.get('projectId') === project.get('id'); });
  res.json({task: newTask.merge({project}).toJS()});
});

app.put('/tasks/:id.json', function(req, res) {
  var taskId = parseInt(req.params.id, 10);
  var task = tasks.find((task) => { return task.get('id') === taskId; });
  task = task.set('status', req.body.status);
  tasks = tasks.set(taskId - 1, task);
  res.sendStatus(200);
});
