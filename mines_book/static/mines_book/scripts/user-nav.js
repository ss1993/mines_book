// Executes the 'onLoad' function after loading the page
$(onLoadUserNav)


function onLoadUserNav() {
    $('#feed').click(showUserFeed)
    $('#friends').click(showFriends)
    $('#joined_groups').click(showJoinedGroups)
    $('#followed_groups').click(showFollowedGroups)
    $('#edit_user_modal').modal()
    $('#edit_user_a').click(showEditUserModal)
    $('#create_user_a').click(showCreateUserModal)
    $('#create_user_modal').modal()
    $('#id_profile_pic').attr({accept:"image/*"})
    onLoadFriendsAjax()
}

function showUserFeed() {
    $('#user_menu a').removeClass('active')
    $('#feed').addClass('active')

    var student_id = $('#username').data('username')

    $.get('/students/' + student_id + '/feed/', function (response) {
        $('#user_content').html(response)
    })

}

function showFriends() {
    $('#user_menu a').removeClass('active')
    $('#friends').addClass('active')

    var student_id = $('#username').data('username')

    $.get('/students/' + student_id + '/friends/', function (response) {
        $('#user_content').html(response)
    })

}

function showJoinedGroups() {
    $('#user_menu a').removeClass('active')
    $('#joined_groups').addClass('active')

    var student_id = $('#username').data('username')

    $.get('/students/' + student_id + '/joined_groups/', function (response) {
        $('#user_content').html(response)
        $('.create_group').click(showNewGroupModal)
        $('.edit_group').click(editGroup)
        $('.ui.modal').modal()

        $('#create_group_form')
            .form({
                fields: {
                    name: 'empty',
                    description: 'empty',
                    profile_pic: 'empty',
                    members: 'empty'
                }
            })

        $('.ui.fluid.search.dropdown')
            .dropdown({
                apiSettings: {
                    url: '/search_students_usernames/{query}'
                }
            })

    })


}

function showFollowedGroups() {
    $('#user_menu a').removeClass('active')
    $('#followed_groups').addClass('active')

    var student_id = $('#username').data('username')

    $.get('/students/' + student_id + '/followed_groups/', function (response) {
        $('#user_content').html(response)
        $('.create_group').click(showNewGroupModal)
        $('.edit_group').click(editGroup)
        $('.ui.modal').modal()

        $('#create_group_form')
            .form({
                fields: {
                    name: 'empty',
                    description: 'empty',
                    profile_pic: 'empty',
                    members: 'empty'
                }
            })

        $('.ui.fluid.search.dropdown')
            .dropdown({
                apiSettings: {
                    url: '/search_students_usernames/{query}'
                }
            })

    })


}

function showNewGroupModal() {
    $('#create_group_modal').modal('show')
}

function showCreateUserModal() {
    $('#create_user_modal').modal('show')

    $('#create_user_form').form({
        fields: {
            username: ['empty', 'maxLength[30]'],
            first_name: ['empty', 'maxLength[30]'],
            last_name: ['empty', 'maxLength[30]'],
            password: 'empty',
            confirm_password: 'match[password]',
            option: 'empty',
            prom: ['exactLength[4]', 'integer[1990..2020]'],
            profile_pic: 'empty',
            city: ['empty', 'maxLength[20]'],
            country: ['empty', 'maxLength[20]'],
        },
        prompt: {
            integer: '{name} must be a year between 1990 and 2000',
        }
    })
}

function showEditUserModal() {
    $('#edit_user_modal').modal('show')

    $('#edit_user_form').form({
        fields: {
            username: ['empty', 'maxLength[30]'],
            first_name: ['empty', 'maxLength[30]'],
            last_name: ['empty', 'maxLength[30]'],
            confirm_password: 'match[password]',
            prom: ['exactLength[4]', 'integer[1990..2020]'],
            option: 'empty',
            city: ['empty', 'maxLength[20]'],
            country: ['empty', 'maxLength[20]'],
        },
        prompt: {
            integer: '{name} must be a year between 1990 and 2000',
        }
    })
}

function editGroup() {
    var group_id = $(this).data('id')
    $.get('/groups/' + group_id + '/edit/', function (response) {
        $('#create_group_modal').after(response)
        $('#id_profile_pic').attr({accept:"image/*"})
        $('#edit_group_modal').modal()

        $('#edit_group_form')
            .form({
                fields: {
                    name: ['empty', 'maxLength[20]'],
                    description: ['empty', 'maxLength[500]'],
                }
            })

        $('#edit_group_dropdown')
            .dropdown({
                apiSettings: {
                    url: '/search_students_not_in_group/' + group_id + '/{query}'
                }
            })

        $('#edit_group_dropdown_r')
            .dropdown({
                apiSettings: {
                    url: '/search_students_in_group/' + group_id + '/{query}'
                }
            })

        $('#edit_group_modal').modal('show')
    })
}