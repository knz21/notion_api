const integrationToken = PropertiesService.getScriptProperties().getProperty('integration_token')
const pageId = ''
const blockId = ''

const retrievePage = () => {
    const header = {
        Authorization: `Bearer ${integrationToken}`,
        'Notion-Version': '2021-05-13'
    }
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        headers: header,
        method: 'get'
    }
    Logger.log(UrlFetchApp.fetch(`https://api.notion.com/v1/pages/${pageId}`, options).getContentText())
}

const createPage = () => {
    const header = {
        Authorization: `Bearer ${integrationToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2021-05-13'
    }
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        headers: header,
        method: 'post',
        payload: JSON.stringify({
            parent: {
                page_id: pageId
            },
            properties: {
                title: [
                    {
                        type: 'text',
                        text: {
                            content: 'New page'
                        }
                    }
                ]
            },
            children: testChildrenObjects
        })
    }
    Logger.log(UrlFetchApp.fetch('https://api.notion.com/v1/pages', options).getContentText())
}

const updatePage = () => {
    const header = {
        Authorization: `Bearer ${integrationToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2021-05-13'
    }
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        headers: header,
        method: 'patch',
        payload: JSON.stringify({
            properties: {
                title: [
                    {
                        type: 'text',
                        text: {
                            content: `api (updated: ${new Date()})`
                        }
                    }
                ]
            }
        })
    }
    Logger.log(UrlFetchApp.fetch(`https://api.notion.com/v1/pages/${pageId}`, options).getContentText())
}

const retrieveBlockChildren = () => {
    const header = {
        Authorization: `Bearer ${integrationToken}`,
        'Notion-Version': '2021-05-13'
    }
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        headers: header,
        method: 'get'
    }
    Logger.log(UrlFetchApp.fetch(`https://api.notion.com/v1/blocks/${blockId}/children`, options).getContentText())
}

const appendBlockChildren = () => {
    const header = {
        Authorization: `Bearer ${integrationToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2021-05-13'
    }
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        headers: header,
        method: 'patch',
        payload: JSON.stringify({
            children: testChildrenObjects
        })
    }
    Logger.log(UrlFetchApp.fetch(`https://api.notion.com/v1/blocks/${blockId}/children`, options).getContentText())
}

const setToken = () => {
    PropertiesService.getScriptProperties().setProperty('', '')
}

const testChildrenObjects = [
    {
        object: 'block',
        type: 'heading_1',
        'heading_1': {
            text: [
                {
                    type: 'text',
                    text: { content: 'added Heading1' }
                }
            ]
        }
    }, {
        object: 'block',
        type: 'heading_2',
        'heading_2': {
            text: [
                {
                    type: 'text',
                    text: { content: 'added Heading2' }
                }
            ]
        }
    }
]