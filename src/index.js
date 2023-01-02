import styles from './styles.css'

function renderStatuses(statuses, limit, address) {
    return statuses.slice(0, limit).map(s => {
        return `<div class="slol_status" style="">
    <div class="slol_emoji">${s.emoji}</div>
    <div class="slol_content">
    ${!address ? `<div class="slol_user"><a href="https://${s.address}.status.lol">@${s.address}</a></div>` : ''}
        <p class="slol_text">${s.content}</p>
        <div class="slol_time"><a href="${`https://${s.address}.status.lol/${s.id}`}">${s.relative_time}</a></div>
    </div>
</div>`
    }).join('')
}

class StatusLolWidget extends HTMLElement {
    constructor() {
        super()
        this.address = this.getAttribute("address") || null
        this.limit = this.getAttribute('limit') || 1
        this.attachShadow({ mode: "open" })
    }

    async connectedCallback() {
        const path = this.address ? `https://api.omg.lol/address/${this.address}/statuses/` : 'https://api.omg.lol/statuslog'
        const statuses = await fetch(path).then((res) => res.json())

        const html = `
            <div class="slol">
                ${renderStatuses(statuses.response.statuses, this.limit, this.address)}
            </div>
        `

        this.shadowRoot.innerHTML = html

        const style = document.createElement("style")
        style.innerHTML = styles
        this.shadowRoot.appendChild(style)
    }
}

customElements.define("status-lol", StatusLolWidget)
