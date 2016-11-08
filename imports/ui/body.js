import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { Notes } from '../api/notes.js';
import './body.html';
import './note.js';
 
Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set("skip", 0);
  Meteor.subscribe('notes');
}); 
 
Template.body.helpers({
  // Получение 5 записей
  notes(){
	// Записи сортируются по дате добавления (отчетности)
	return Notes.find({}, { limit: 5, skip: Template.instance().state.get("skip"), sort: { date: -1 } });
  },
});

Template.body.events({
  // Добавление записи
  'click .add-note'(){
	// Дата отчетности = дата добавления записи
	let date = new Date();
	let project = $("#note_project").val();
    let text = $("#note_text").val();
	Meteor.call('notes.insert', date, project, text);
	// Очищаем форму
	$("#new_note").trigger('reset');
  },
  // Назад
  'click .prev'(){
    // Если мы не в начале, листаем назад
    if(Template.instance().state.get("skip") >= 5)
	  Template.instance().state.set("skip", Template.instance().state.get("skip") - 5);
  },
  // Далее
  'click .next'(){
	// Если мы не достигли конца списка, листаем дальше
    if(Template.instance().state.get("skip") + 5 < Notes.find({}).count())
	  Template.instance().state.set("skip", Template.instance().state.get("skip") + 5);
  },
});