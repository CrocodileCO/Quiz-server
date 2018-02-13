# Quiz-server

REST-api server for android application.

## Quick start

### Clone
```sh
$ git clone https://github.com/CrocodileCO/Quiz-server
```

### Run
```sh
$ cd Quiz-server
$ npm install
$ npm start
```

### Testing

in development

## Using the API:
-------------
## Topics
#### Get topics
``` sh
$ curl -XGET http://localhost:3000/topics
```
#### Get topic by id
``` sh
$ curl -XGET http://localhost:3000/topics/:topicId
```
#### Add topic
```sh
$ curl -XPOST "http://localhost:3000/api/topics" -d \
'{ 
    "title":"new Topic",
    "imageUrl":"http://memesmix.net/media/created/vdimts.jpg" 
}' \
-H 'Content-Type: application/json'
```
#### Update topic
``` sh
$ curl -XPATCH "http://localhost:3000/api/topics/:topicId" \
-d \
'{
    "title":"topicUp"
}'\
-H 'Content-Type: application/json'
```
#### Delete topic
``` sh
$ curl -XDELETE "http://localhost:3000/api/topics/:topicId"
```
#### Get all questions for topic
``` sh
$ curl -XGET "http://localhost:3000/api/topics/:topicId/questions"
```
#### Get limited random questions for topic
``` sh
# @params limit - maximum amount questions (default = 10)
$ curl -XGET "http://localhost:3000/api/topics/:topicId/rnd?limit=2"
```
-------------
### Questions 
#### Get questions
``` sh
$ curl -XGET http://localhost:3000/questions
```
#### Get question by id
``` sh
$ curl -XGET http://localhost:3000/questions/:questionId
```
#### Add question 
```sh
# change "topicId" for use
$ curl -XPOST "http://localhost:3000/api/questions" -d \
'{
    "imageUrl":"http://memesmix.net/media/created/vdimts.jpg",
    "answer1":"answer1",
    "answer2":"answer2",
    "answer3":"answer3",
    "answer4":"answer4",
    "topicId":"5a7d3a1890843bbf62b1cc2a"
}' \
-H 'Content-Type: application/json'
```
#### Update question
``` sh
$ curl -XPATCH "http://localhost:3000/api/questions/:questionId" \
-d \
'{
    "answer1":"answerUp"
}'\
-H 'Content-Type: application/json'
```
#### Delete question
``` sh
$ curl -XDELETE "http://localhost:3000/api/questions/:questionId"
```
-------------

### 
