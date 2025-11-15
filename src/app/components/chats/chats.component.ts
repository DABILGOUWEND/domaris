import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ImportedModule } from '../../shared/modules/imported/imported.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatUserStore } from '../../stores/appstore';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-chats',
  imports: [ImportedModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent implements OnInit{
  myForm:FormGroup;
  searchControl=new  FormControl('');
  search_text=signal('')
  chatUsersStore =inject(ChatUserStore);
  receverId=signal('');
  auth=inject(AuthService)
  users$ = computed(() => {
    return this.chatUsersStore.users().filter(x=>x.nom.toLowerCase().includes(this.search_text()) 
    || x.prenom.toLowerCase().includes(this.search_text())
  )
  })
  selectedMessage=computed(()=>{
    let uid=this.receverId();
    return this.chatUsersStore.my_chats().filter(x=>x.receiverId==uid || x.senderId==uid)
  })

  constructor(
    private _fb: FormBuilder
  ) {
    this.myForm = this._fb.group({
      message: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.chatUsersStore.loadUsers();
    this.chatUsersStore.loadChats();
  }
  submitMessage() {
    if (this.myForm.valid) {
      const message = this.myForm.value.message;
      this.myForm.reset();
    }
  }
selectUser(user:any){
  this.receverId.update(x=>user.uid);
}
searchUsers(){
 let text=this.searchControl.value;
 if(text!=null)
 this.search_text.set(text)

}

createChat(user:any){
  this.chatUsersStore.addUser(user)
}
}
