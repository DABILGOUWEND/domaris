import { Component, computed, effect, ElementRef, inject, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatUserStore } from '../../stores/appstore';
import { AuthService } from '../../auth/services/auth.service';
import { chat_users } from '../../modeles/models';
import { DateDisplayPipe } from '../../pipes/date-display.pipe';
import { set } from '@angular/fire/database';

@Component({
  selector: 'app-chats',
  imports: [ImportedModule, DateDisplayPipe],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent implements OnInit {
  endofChat = viewChild.required<ElementRef<HTMLInputElement>>('endofChat');
  myForm: FormGroup;
  searchControl = new FormControl('');
  messageFormControl = new FormControl('');
  search_text = signal('')
  
  chatUsersStore = inject(ChatUserStore);
  otherUserId = signal<chat_users | undefined>(undefined);
  receverId = signal('');
  auth = inject(AuthService)
  users$ = computed(() => {
    return this.chatUsersStore.users().filter(x => x.nom.toLowerCase().includes(this.search_text())
      || x.prenom.toLowerCase().includes(this.search_text())
    )
  })
  chats$ = computed(() => {
    let userIds = this.chatUsersStore.my_chats().map(x => x.userIds).flat().filter(x => x != this.auth.userSignal().uid);
    let users = this.chatUsersStore.users().filter(x => userIds.includes(x.uid));
    return users
  })
  selected_chats = computed(() => {
    let uid = this.receverId();
    return this.chatUsersStore.my_chats().find(x => x.userIds.includes(uid));
  })

  constructor(
    private _fb: FormBuilder
  ) {
    this.myForm = this._fb.group({
      message: ['', Validators.required]
    });
    effect(() => {
      
    });
  }
  ngOnInit(): void {
    this.auth.ref.set(this.endofChat());
    this.chatUsersStore.loadUsers();
    this.chatUsersStore.loadChats();
  }
  submitMessage() {
    if (this.myForm.valid) {
      const message = this.myForm.value.message;
      this.myForm.reset();
    }
  }
  selectUser(user: any) {
    this.receverId.update(x => user.uid);
    this.otherUserId.set(user);
    this.scroolTobottom();
    this.createChat(user);
  }
  searchUsers() {
    let text = this.searchControl.value;
    if (text != null)
      this.search_text.set(text)
  }

  createChat(user: any) {
    if (this.selected_chats() == undefined) {
      this.chatUsersStore.new_chat({
        userId: this.auth.userSignal().uid,
        otherUserId: user.uid,
      })
    }
  }
  sendMessage() {
    const message = this.messageFormControl.value;
    if (message != null && this.selected_chats() != undefined) {
      this.chatUsersStore.add_message({
        ref:this.endofChat(),
        chatId: this.selected_chats()!.id,
        senderId: this.auth.userSignal().uid,
        message: message
      });
      this.messageFormControl.reset();
    }
  }
  scroolTobottom() {
    if (this.auth.ref()) {
      setTimeout(() => {
        this.auth.ref()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}