import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

import Sections from '../data/sections.yaml'
import Authors from '../data/authors.yaml'

export default function PageTitle ({ section }) {
  const currentSectionIndex = _.findIndex(Sections, { slug: section })
  const currentSection = Sections[currentSectionIndex]
  const previousSection = Sections[currentSectionIndex - 1]
  const nextSection = Sections[currentSectionIndex + 1]
  const author = _.find(Authors, { slug: currentSection.author })
  
  const image = `http://stateofjs.com/exports/png/${currentSection}-stacked.png`
  const url = `http://stateofjs.com/2016/${currentSection}/`
  const metaTitle = `State Of JavaScript Survey Results: ${currentSection.title}`
  const description = `Find out which JavaScript tools and frameworks are the most popular.`
  const meta = [
    // facebook
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:title', content: metaTitle },
    { property: 'og:description', content: description },
    // twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image:src', content: image },
    { name: 'twitter:title', content: metaTitle },
    { name: 'twitter:description', content: description },
  ]

  return (
    <div className="page-title">
      <Helmet meta={meta} />
      <div className="inner">
        {previousSection ? <Link className="pagination-link pagination-previous" to={`/2016/${previousSection.slug}/`} >&lt;&lt; {previousSection.name}</Link> : <span />}
        <div className="page-title-contents">
          <h1 className="page-title-main">{currentSection.name}</h1>
          <h4 className="page-title-author">
            <span className="by">by</span>
            <img className="page-title-avatar" src={author.avatar} />
            <a href={author.url}>{author.name}</a>
          </h4>
        </div>
        <span className="spacer" />
        {nextSection ? <Link className="pagination-link pagination-next" to={`/2016/${nextSection.slug}/`} >{nextSection.name} &gt;&gt;</Link> : <span />}
      </div>
    </div>
  )
}

PageTitle.propTypes = {
  title: React.PropTypes.string,
  section: React.PropTypes.string,
}
