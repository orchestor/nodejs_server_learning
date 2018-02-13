# Chat App
In this project I am trying to learn socket.io by doing a public chat room. 
I am using MVC design pattern with Object Literal Javascript

## Getting Started
To be able to host and use this application
 * Download [NodeJS](https://nodejs.org/en/). 
 * [Install NodeJS](https://duckduckgo.com/?q=setting+up+nodejs&t=ffab&ia=web) 
 * [Download this project]()
 * Open Bash at the location of the folders
 * Use ``` npm i ```
 * Then ``` npm start ```
 * You can use ``` localhost:9696 ``` location 

## Using Object Literal 
Using Javascript with Object Literal Method gives clarity to javascript page 
In my opinion it is easy to read and easy to expand upon


### View Creation

For example if someone wants to create a View, can do it in 4 easy steps
* Create Object from CoreView, this Object has everything needed
```
var NewView = Object.create(CoreView)
```
* Giving NewView a name to link with template
```
var NewView.name = 'NewView'
```
  * In this version If no name is specified TemplateManager will throw error and break app
  * Templates have to be ``` .html ``` documents
  * View's name value must be same with template file name like ``` NewView.html ``` 
* And use initialize with parent element as argument
```
NewView.initialize(document.body)
```
* And finally display, if true given as argument View will be added to top of parents childnodes
```
NewView.display()
```
