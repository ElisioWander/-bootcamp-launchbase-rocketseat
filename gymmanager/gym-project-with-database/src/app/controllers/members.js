const { date, bloodType } = require('../../lib/utils')
const Member = require('../models/Member')


module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            limit,
            offset,
            callback(members) {
                if(!members[0]) {
                    return res.render("members/not-found.html")
                } else {
                    const pagination = {
                        total: Math.ceil(members[0].total / limit),
                        page
                    }
    
                    return res.render("members/index.html", { members, filter, pagination })
                }
            }
        }

        Member.paginate(params)
       
    },
    create(req, res) {
        Member.instructorsSelectOptions(function(options) {
            return res.render("members/create.html", { instructorOptions: options })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("please, fill all fields")
            }
        }

        Member.create(req.body, function(member) {
            return res.redirect(`/members/${member.id}`)
        })
    },
    edit(req, res) {
        Member.find(req.params.id, function(member) {
            if(!member) return res.send("Member not found!")

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(function(options) {

                return res.render("members/edit.html", { member, instructorOptions: options })
            })
        })
    },
    show(req, res) {
        Member.find(req.params.id, function(member) {
            if(!member) return res.send("member not fond!")

            member.birth = date(member.birth).birthDay
            member.blood = bloodType(member.blood)

            return res.render("members/show.html", { member })
            
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("please, fill all fields")
            }
        }

        Member.update(req.body, function() {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res) {
        Member.delete(req.body.id, function() {
            return res.redirect("/members")
        })
    }
}
