<template>
    <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Student Management</h3>

                <div class="card-tools">
                  <button class="btn btn-success" data-toggle="modal" data-target="#addStudentModal">Add New <i class="fas fa-user-plus"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Studnet Email</th>
                            <th>Father Name</th>
                            <th>Address</th>
                            <th>Student Class</th>
                        </tr>
                        <tr v-for="student in students" :key="student.id">
                            <td>{{student.id}}</td>
                            <td>{{ student.name }}</td>
                            <td>{{ student.email }}</td>
                            <td>{{ student.father_name }}</td>
                            <td>{{ student.address }}</td>
                            <td>{{ student.student_class }}</td>
                            <td>
                                <button @click="deleteStudent(student.id)" href="#" class="text-danger">
                                <i class="nav-icon fas fa-trash"></i>
                                Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>


            <!-- Modal -->
            <div class="modal fade" id="addStudentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Student</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form class="form" @submit.prevent="createStudent">
                        <div class="modal-body">
                            <!-- form start -->
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="student_name" class="col-sm-4 control-label">Student Name</label>

                                        <div class="col-sm-8">
                                        <input v-model="form.name" type="text" class="form-control" id="student_name" name="name" placeholder="New Student Name"
                                        :class="{ 'is-invalid': form.errors.has('name') }">
                                        <has-error :form="form" field="name"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="father_name" class="col-sm-4 control-label">Father Name</label>

                                        <div class="col-sm-8">
                                        <input v-model="form.father_name" type="text" class="form-control" id="father_name" name="father_name" placeholder="Father Name"
                                        :class="{ 'is-invalid': form.errors.has('father_name') }">
                                        <has-error :form="form" field="father_name"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="email" class="col-sm-4 control-label">Email</label>

                                        <div class="col-sm-8">
                                        <input v-model="form.email" type="email" class="form-control" id="email" name="email" placeholder="Student Email"
                                        :class="{ 'is-invalid': form.errors.has('email') }">
                                        <has-error :form="form" field="email"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="address" class="col-sm-4 control-label">Address</label>

                                        <div class="col-sm-8">
                                        <input v-model="form.address" type="text" class="form-control" id="address" name="address" placeholder="Address"
                                        :class="{ 'is-invalid': form.errors.has('address') }">
                                        <has-error :form="form" field="address"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="student_class" class="col-sm-4 control-label">Student Class</label>

                                        <div class="col-sm-8">
                                        <input v-model="form.student_class" type="text" class="form-control" id="student_class" name="student_class" placeholder="Student Class"
                                        :class="{ 'is-invalid': form.errors.has('student_class') }">
                                        <has-error :form="form" field="student_class"></has-error>
                                        </div>
                                    </div>
                                </div>
                            <!-- /.card-body -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button :disabled="form.busy" type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
</template>


<script>
export default {
    data() {
        return  {
            students: {},
            form: new Form({
                name: '',
                email:'',
                father_name: '',
                address:'',
                student_class:''
            })
        }
    },
    methods: {
        getStudents() {
            this.$Progress.start()
            axios.get('api/students')
                .then(({data}) => (this.students = data.data));
        },
        createStudent(){
            this.$Progress.start()
            this.form.post('api/students')
                .then(()=>{
                    Refresh.$emit('refreshStudents');
                    $('#addStudentModal').modal('hide');
                     toast({
                        type: 'success',
                        title: 'Added successfully'
                    })
                    this.$Progress.finish()
                })
                .catch(()=>{

                })
        },
        deleteStudent(id) {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                // send request here
                if (result.value) {
                this.form.delete('api/students/'+id)
                    .then( ()=> {                      
                            swal(
                            'Deleted!',
                            'Student has been deleted.',
                            'success'
                            )
                            Refresh.$emit('refreshStudents')
                    })
                    .catch( ()=> {
                        swal('Failed', 'There are something wrong.', 'warning')
                    })
                }                
            })
        }
    },
    created() {
        this.getStudents();
        Refresh.$on('refreshStudents', () => {
            this.getStudents();
        });
    },
    mounted() {

    }
}
</script>
