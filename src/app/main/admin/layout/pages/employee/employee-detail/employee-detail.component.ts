import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, ConfirmationService, MessageService } from 'primeng/api';
import { AppLoadingService } from '../../../services/app-loading.service';
import { AppNotificationService } from '../../../services/app-notification.service';
import { EmployeeEndpoint } from 'src/app/api/endpoints/emplyee.endpoint';
import { EmployeeResource, UpdateEmployeeDto } from 'src/app/api/models/employee.model';
import { StateResource } from 'src/app/api/models/state.model';
import { LgaResource } from 'src/app/api/models/lga.model';
import { MaritalStatusResource } from 'src/app/api/models/MaritalStatus.model';
import { FileUploadEndpoint } from 'src/app/api/endpoints/file-upload-endpoint';
import { MaritalStatusEndpoint } from 'src/app/api/endpoints/marital-status.endpoint';
import { StateEndpoint } from 'src/app/api/endpoints/state.end.point';
import { LgaEndpoint } from 'src/app/api/endpoints/lga.endpoint';
import { imagePathPrefix } from 'src/app/api/endpoints/api';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  id: any;
  operation: any | undefined
  employees: EmployeeResource[] = [];
  states: StateResource[] = [];
  state?: StateResource;
  updateEmployee?: UpdateEmployeeDto;
  selectedEmployee?: EmployeeResource;
  lgas: LgaResource[] = [];
  lga?: LgaResource;
  maritalStatus!: MaritalStatusResource;
  imageFile?: any;
  uploadedImageName?: any;
  loading = false;

  employeeForm: FormGroup = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    phone_number: this.fb.control('', [Validators.required, Validators.maxLength(14)]),
    email: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    address: this.fb.control('', [Validators.required]),
    state_id: this.fb.control<StateResource | null>(null, [Validators.required]),
    local_government_id: this.fb.control<LgaResource | null>(null, [Validators.required]),
    marital_status_id: this.fb.control<MaritalStatusResource | null>(null, [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private readonly fileUploadEndpoint: FileUploadEndpoint,
    private employeeEndpoint: EmployeeEndpoint,
    private maritalStatusEndpoint: MaritalStatusEndpoint,
    private stateEndpoint: StateEndpoint, private lgaEndpint: LgaEndpoint
  ) { }

  ngOnInit(): void {

    this.appLoadingService.startLoading('loading');
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.employeeEndpoint.singleEmployee(this.id).subscribe({
          next: (response) => {
            this.appLoadingService.stopLoading();
            this.selectedEmployee = response.data;
            this.updateEmployee = {
              id: this.selectedEmployee.id,
              name: this.selectedEmployee.name,
              date_of_birth: this.selectedEmployee.date_of_birth,
              phone_number: this.selectedEmployee.phone_number,
              email: this.selectedEmployee.email,
              address: this.selectedEmployee.email,
              state_id: this.selectedEmployee.state_id,
              local_government_id: this.selectedEmployee.local_government_id,
              marital_status_id: this.selectedEmployee.marital_status_id,
              image: this.selectedEmployee?.image,
              file: this.selectedEmployee?.file,
            };
            this.uploadedImageName = this.selectedEmployee?.image;
            this.imageFile = imagePathPrefix + this.selectedEmployee?.image;

          },
          error: (error) => {
            this.appLoadingService.stopLoading();
            this.appNotificationService.showError({
              title: 'Oops!!!',
              detail: error.error.message
            });
            this.back();
          }
        });

      }
    }
    );

    this.stateEndpoint.list()
      .subscribe({
        next: (data) => {
          // this.state = data;
          console.log(data)
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });

    this.lgaEndpint.list()
      .subscribe({
        next: (data) => {
          // this.states = data;
          console.log(data)
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
  }

  get employeeFormControls() {
    return this.employeeForm.controls;
  }

  back() {
    window.history.back();
  }

  processRequest() {
    if (this.operation === 'Update') {
      this.appLoadingService.startLoading('Loading...');
      if (!this.updateEmployee) {
        return;
      }
      this.employeeEndpoint.updateemployee(this.id, this.operation.id).subscribe({
        next: () => {
          this.appLoadingService.stopLoading();
          this.appNotificationService.showSuccess({
            title: 'Employee Update',
            detail: 'Record was Successfully Updated'
          });
          this.resetForm();
        },
        error: (error) => {
          this.appLoadingService.stopLoading();
          this.operation = 'Edit';
          this.appNotificationService.showError({
            title: 'Oops',
            detail: error.error.message,
          });
        }
      });
    }
    else {
      this.operation = 'Edit';
      this.employeeForm.patchValue({
        name: this.selectedEmployee?.name,
        state_id: this.selectedEmployee?.state_id,
        local_government_id: this.selectedEmployee?.local_government_id,
        marital_status_id: this.selectedEmployee?.marital_status_id,
        address: this.selectedEmployee?.address,
        phone_number: this.selectedEmployee?.phone_number,
        uploadedImageName: this.selectedEmployee?.image,
        imageFile: imagePathPrefix + this.selectedEmployee?.image,

      });
    }

  }

  delete() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?',
      accept: () => {
        this.appLoadingService.startLoading('loading..');
        this.employeeEndpoint.delete(this.id).subscribe({
          next: () => {
            this.appLoadingService.stopLoading()
            this.appNotificationService.showSuccess({
              title: 'Commodity',
              detail: 'was Succefully Deleted',
            });
          },
          error: (error) => {
            this.appLoadingService.stopLoading()
            this.appNotificationService.showError({
              title: 'Oops!!!',
              detail: error.error.message,
            });
          }
        });
        return this.router.navigate(['/adim/pages/employee/detail']);
      },
      reject: () => {
        this.appNotificationService.showInfo({
          title: 'Oops!!!',
          detail: 'Operation was Cancelled',
        });
      }

    });
  }

  preview() {
    const state_id = this.employeeForm.controls['state_id'].value;
    const local_government_id = this.employeeForm.controls['local_government_id'].value;
    const address = this.employeeForm.controls['address'].value;
    const name = this.employeeForm.controls['name'].value;


    this.selectedEmployee = this.employees.find(e => e.id == state_id);
    this.selectedEmployee = this.employees.find(e => e.id == local_government_id);
    this.selectedEmployee = this.employees.find(e => e.id == local_government_id);
    this.selectedEmployee = this.employees.find(e => e.id == name);
    this.selectedEmployee = this.employees.find(e => e.id == address);

    // this.updateEmployee = {
    //   name: this.employeeForm.value.name,
    //   state_id: this.employeeForm.value.state_id,
    //   local_government_id: this.employeeForm.value.local_government_id,
    //   marital_status_id: this.employeeForm.value.marital_status_id,
    //   address: this.employeeForm.value.address,
    //   phone_number: this.employeeForm.value.phone_number,
    //   uploadedImageName: this.employeeForm.value.image,
    //   imageFile: imagePathPrefix + this.employeeForm.value.image,
    // };

    this.operation = 'Update';
  }
  resetForm() {
    this.employeeForm.reset();
    this.operation = '';
  }

  handleFileInputUploadImage(e: any) {

    const file = e.target.files[0];
    const formData: FormData = new FormData();
    formData.append('image_file', file, file.name);

    this.fileUploadEndpoint.imageUpload(formData).subscribe({
      next: (response) => {
        this.uploadedImageName = response.filename;
        this.imageFile = imagePathPrefix + this.uploadedImageName;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
