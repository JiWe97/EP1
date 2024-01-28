import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private toastr: ToastrService) { }

  onSubmit() {
    this.toastr.success('Not all heroes wear crêpes, but you do! Thanks for your message, we will respond as soon as possible.', '', {
      positionClass: 'toast-bottom-right'
    });
  }
}
