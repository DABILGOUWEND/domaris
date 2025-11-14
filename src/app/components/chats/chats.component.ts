import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatUserStore } from '../../stores/appstore';

@Component({
  selector: 'app-chats',
  imports: [ImportedModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent implements OnInit{
  myForm:FormGroup;
  searchControl=new  FormControl('');
  chatUsersStore =inject(ChatUserStore);
  users$ = computed(() => {
    return this.chatUsersStore.users_data()
  })

  constructor(
    private _fb: FormBuilder
  ) {
    this.myForm = this._fb.group({
      message: ['', Validators.required]
    });
    effect(() => {
      const users = this.chatUsersStore.users_data();
      console.log('Chat users updated:', users);
    });
  }
  ngOnInit(): void {
    this.chatUsersStore.loadUsers();
  }
  submitMessage() {
    if (this.myForm.valid) {
      const message = this.myForm.value.message;
      console.log('Message submitted:', message);
      this.myForm.reset();
    }
  }
selectUser(user:any){
}
}
