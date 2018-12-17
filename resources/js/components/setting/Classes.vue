<template>
    <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Class Management</h3>

                <div class="card-tools">
                  <button class="btn btn-success" data-toggle="modal" data-target="#addSectionModal">Add New <i class="fas fa-user-plus"></i> </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Section Name</th>
                            <th>Class Name</th>
                            <th>Setting</th>
                        </tr>
                        <tr v-for="classinfo in classes" :key="classinfo.id">
                            <td>{{classinfo.id}}</td>
                            <td>{{ classinfo.class_name }}</td>
                            <td>{{ classinfo.section_name }}</td>
                            <td>
                                <button @click="deleteClass(classinfo.id)" href="#" class="text-danger">
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
            <div class="modal fade" id="addSectionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Class</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form class="form" @submit.prevent="createClass">
                        <div class="modal-body">
                            <!-- form start -->
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="inputClassName" class="col-sm-4 control-label">Class Name</label>

                                        <div class="col-sm-8">
                                        <input v-model="form.class_name" type="text" class="form-control" id="inputClassName" name="class_name" placeholder="New Class Name"
                                        :class="{ 'is-invalid': form.errors.has('class_name') }">
                                        <has-error :form="form" field="class_name"></has-error>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputSectionName" class="col-sm-4 control-label">Section Name</label>

                                        <div class="col-sm-8">
                                        <input v-model="form.section_name" type="text" class="form-control" id="inputSectionName" name="section_name" placeholder="New Section Name"
                                        :class="{ 'is-invalid': form.errors.has('class_name') }">
                                        <has-error :form="form" field="section_name"></has-error>
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
            classes: {},
            form: new Form({
                class_name:'',
                section_name: ''
            })
        }
    },
    methods: {
        getClass() {
            this.$Progress.start()
            axios.get('api/class')
                .then(({data}) => (this.classes = data.data));
        },
        createClass(){
            this.$Progress.start()
            this.form.post('api/class')
                .then(()=>{
                    Refresh.$emit('RefreshClasses');
                    $('#addSectionModal').modal('hide');
                     toast({
                        type: 'success',
                        title: 'Added successfully'
                    })
                    this.$Progress.finish()
                })
                .catch(()=>{

                })
        },
        deleteClass(id) {
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
                this.form.delete('api/class/'+id)
                    .then( ()=> {                      
                            swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            )
                            Refresh.$emit('RefreshClasses')
                    })
                    .catch( ()=> {
                        swal('Failed', 'There are something wrong.', 'warning')
                    })
                }                
            })
        }
    },
    created() {
        this.getClass();
        Refresh.$on('RefreshClasses', () => {
            this.getClass();
        });
    },
    mounted() {

    }
}
</script>
