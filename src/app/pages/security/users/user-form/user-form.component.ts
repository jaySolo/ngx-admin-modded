import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../../@core/interfaces/auth/users';

@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {

  @Input() isNewUser: boolean = true;
  @Input() action: string = 'view';
  @Input() userData: User = null;
  @Input() loading: boolean;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();

  submitting: boolean;

  userForm = new FormGroup(this.isNewUser !== true ? {
    id: new FormControl(''),
    first_name: new FormControl('', { validators: [Validators.required] }),
    last_name: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    username: new FormControl('', { validators: [Validators.required] }),
    role: new FormControl('', { validators: [Validators.required] }),
    status: new FormControl('', { validators: [Validators.required] }),
    blocked: new FormControl('', { validators: [Validators.required] }),
    confirmed: new FormControl({ value: false, disabled: true }),
  } : {
    id: new FormControl(''),
    first_name: new FormControl('', { validators: [Validators.required] }),
    last_name: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    username: new FormControl('', { validators: [Validators.required] }),

    password: new FormControl('', { validators: [Validators.required] }),
    confirmPassword: new FormControl('', { validators: [Validators.required] }),

    role: new FormControl('', { validators: [Validators.required] }),
    status: new FormControl('', { validators: [Validators.required] }),
    blocked: new FormControl('', { validators: [Validators.required] }),
    confirmed: new FormControl({ value: false, disabled: true }),
    // // this.userForm.validator = () => ConfirmPasswordValidator('password', 'confirmPassword');

    // this.roleFormCtrl = new FormControl(this.user?.role?.id ?? null, {
    //   validators: [Validators.required],
    // });

    // this.deptFormCtrl = new FormControl(this.user?.departments ?? null);
  });

  constructor() { }


  ngOnInit(): void {
    this.submitting = false;
    if (!this.loading) {
      this.setForm(this.userData);
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes detected...', changes);
    // console.log('at start::= ', 'action: ', this.action, '  submitting: ', this.submitting);

    if (changes['userData']) {
      this.setForm(changes['userData'].currentValue);
    }

    if (changes['action']) {
      switch (changes['action'].currentValue) {
        case 'view':
          this.userForm.disable()
          break;

        default:
          if (this.submitting) {
            this.submitting = false;
          }
          this.userForm.enable()
          break;
      }
    }

    // console.log('at end::= ', 'action: ', this.action, '  submitting: ', this.submitting);
  }


  setForm(formValue: any): void {
    if (formValue) {
      const { id, first_name, last_name, email, username, password, confirmPassword, role, status, blocked, confirmed } = formValue;
      this.userForm.setValue({ id, first_name, last_name, email, username, password, confirmPassword, role, status, blocked, confirmed });
    }
  }


  onSubmitClick(): void {
    this.submitting = true
    this.userForm.disable()
    this.onSubmit.emit({ value: this.userForm.value });
  }


  cancelEditing(): void {
    this.onCancel.emit({ value: true });
  }
}
