import React from 'react'
import './socialButton.scss'

//These are the only supported websites
// To add more websites please check that icon is available in Font Awesome under the same sntaxis
// and update the colors in the css
const SOCIAL_MEDIA = [
  {
    name: 'mail',
    icon: 'far fa-envelope',
  },
  {
    name: 'facebook',
    icon: 'fab fa-facebook-f',
  },
  {
    name: 'twitter',
    icon: 'fab fa-twitter',
  },
  {
    name: 'youtube',
    icon: 'fab fa-youtube',
  },
  {
    name: 'instagram',
    icon: 'fab fa-instagram',
  },
  {
    name: 'linkedin',
    icon: 'fab fa-linkedin-in',
  },
]

function SocialButton({ link, socialMediaName, icon }) {
  //Looks for the social media in the list, uses first icon in the list if not found
  const socialMedia =
    SOCIAL_MEDIA.find((element) => element.name === socialMediaName) ||
    SOCIAL_MEDIA[0]

  return (
    <a
      href={`${link}`}
      className={`social-buttons__button social-button social-button--${socialMedia.name}`}
      aria-label={socialMedia.name}
    >
      <i className={`${socialMedia.icon}`}></i>
    </a>
  )
}

export default SocialButton
