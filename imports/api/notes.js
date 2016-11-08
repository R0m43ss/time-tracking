import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.startup(function() {
	Meteor.publish('notes', function() {
      return Notes.find({});
    });  
  });
}

Meteor.methods({
	// Добавление новой записи
	'notes.insert'(date, project, text){
	  // Комментарий не является обязательным параметром; 
	  if(text=="")
	    text = "No comment.";
	  Notes.insert({ date: date, project: project, comment: text });
	},
	// Удаление записи
	'notes.remove'(id){
	  Notes.remove(id);
	},
	// Редактирование существующей записи
	'notes.update'(id, text){
	  if(text=="")
	    text = "No comment.";
	  Notes.update(id, { $set: { text } });
	},
});