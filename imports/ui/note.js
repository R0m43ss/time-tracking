import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import './note.html';

Template.note.onCreated(function noteOnCreated(){
  this.state = new ReactiveDict();
  this.state.set("show", false);
});

Template.note.helpers({
  // Выводим дату в формате "дд/мм/гггг, чч:мм"
  getDate(){
	date = this.date.getDate().toString();
	month = (this.date.getMonth() + 1).toString();
	year = this.date.getFullYear().toString();
	hours = this.date.getHours().toString();
	minutes = this.date.getMinutes().toString();
	return date + "/" + month + "/" + year + ", " + hours + ":" + minutes;
  },
  // Проверка, нужно ли показывать форму редактирования
  show(){
	return Template.instance().state.get("show");
  },
});

Template.note.events({
  // Удаление записи
  'click .delete-note'(){
	Meteor.call('notes.remove', this._id);
  },
  // Открытие формы редактирования
  'click .edit-note'(){
	let sh = Template.instance().state.get("show");
	Template.instance().state.set("show", !sh);
  },
  // Сохранение изменений в записи
  'click .save'(){
	Meteor.call('notes.update', this._id, $("#note_text" + this._id).val());
	Template.instance().state.set("show", false);
  },
});