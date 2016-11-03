import test from "tape"
import { when } from "mobx"
import BaseStore from "./base"


import { convertQuery, getTotalItems } from '../examples/blog/js/api_flavor'
import DataRequester from '../services/requester'
const _requester = new DataRequester(convertQuery, getTotalItems, 'http://localhost:3000')


test("it should be possible to add a message", t => {

    const store = new BaseStore(_requester, {})
    t.equal(store.messages.size, 0)

    store.addMessage('ahoj', 'info')

    t.equal(store.messages.size, 1)
    t.equal(store.messages.has('ahoj'), true)
    t.equal(store.messages.get('ahoj').text, 'ahoj')
    t.equal(store.messages.get('ahoj').timeout, 0)
    t.end()
})

// test("it should not be possible to read documents without login", t => {
//     const viewStore = new ViewStore(stubFetch)
//     viewStore.showDocument(1)
//
//     t.equal(viewStore.currentView.name, "document")
//     t.equal(viewStore.isAuthenticated, false)
//     when(
//         () => viewStore.currentView.document.state !== "pending",
//         () => {
//             t.equal(viewStore.currentView.document.state, "rejected")
//             t.notOk(viewStore.currentView.document.value)
//             t.end()
//         }
//     )
// })
//
// test("it should be possible to read documents with login", t => {
//     const viewStore = new ViewStore(stubFetch)
//
//     viewStore.performLogin("user", "1234", result => {
//         t.equal(result, true)
//         t.equal(viewStore.isAuthenticated, true)
//         t.equal(viewStore.currentUser.name, "Test user")
//
//         viewStore.showDocument(1)
//
//         t.equal(viewStore.currentView.name, "document")
//         when(
//             () => viewStore.currentView.document.state !== "pending",
//             () => {
//                 t.equal(viewStore.currentView.document.state, "fulfilled")
//                 t.equal(viewStore.currentView.document.value.text, "fun")
//                 t.end()
//             }
//         )
//     })
// })
