export const atelier_engQuery = `
{
  carouselCollection {
    items {
      title(locale: "en-US")
      validation
      carouselImageCollection {
        items {
          url (transform: {width: 1400})
        }
      }
      description(locale: "en-US") {
        json
      }
    }
  }
}

`;

export const atelier_freQuery = `
{
  carouselCollection {
    items {
      title(locale: "fr")
      validation
      carouselImageCollection {
        items {
          url (transform: {width: 1400})
        }
      }
      description(locale: "fr") {
        json
      }
    }
  }
}

`;

export const contact_engQuery = `
{
  bioCollection {
    items {
      bioText (locale: "en-US") {
        json
      }
      bioTitle
      bioImage {
          url (transform: {width: 1400})
      }
    }
  }
}
`;

export const contact_freQuery = `
{
  bioCollection {
    items {
      bioText (locale: "fr") {
        json
      }
      bioTitle
      bioImage {
          url (transform: {width: 1400})
      }
    }
  }
}
`;

export const events_engQuery = `
{
  residencesCollection {
    items {
      description(locale:"en-US")
      residencesPhotos {
        title(locale:"en-US")
          url (transform: {width: 1400})
      }
      eventText(locale:"en-US") {
        json
      }
    }
  }
}
`;

export const events_freQuery = `
{
  residencesCollection {
    items {
      description(locale:"fr")
      residencesPhotos {
        title(locale:"fr")
          url (transform: {width: 1400})
      }
      eventText(locale:"fr") {
        json
      }
    }
  }
}
`;

export const productions_engQuery = `
{
  artistesCollection {
    items {
      sys {
        id
      }
      artistName
      projectName
      year
      description(locale:"en-US") {
        json
      }
      galleryCollection {
        items {
          url (transform: {width: 1400})
        }
      }
    }
  }
}
`;

export const productions_freQuery = `
{
  artistesCollection {
    items {
      sys {
        id
      }
      artistName
      projectName
      year
      description(locale:"fr") {
        json
      }
      galleryCollection {
        items {
          url (transform: {width: 1400})
        }
      }
    }
  }
}
`;

export const residences_engQuery = `
{
  productionsCollection {
    items {
      sys {
        id
      }
      artistName
      projectName
      year
      description(locale:"en-US") {
        json
      }
      galleryCollection {
        items {
          url (transform: {width: 1400})
        }
      }
    }
  }
}
`;

export const residences_freQuery = `
{
  productionsCollection {
    items {
      sys {
        id
      }
      artistName
      projectName
      year
      description(locale:"fr") {
        json
      }
      galleryCollection {
        items {
          url (transform: {width: 1400})
        }
      }
    }
  }
}
`;

export const footer_engQuery = `
{
  navbarCollection {
    items {
      navbar(locale:"en-US")
    }
  }
}
`;

export const footer_freQuery = `
{
  navbarCollection {
    items {
      navbar(locale: "fr")
    }
  }
}
`;

export const home_query = `
{
  heromediaCollection {
    items {
      heromedia {
          url
      }
    }
  }
}
`;

export const nav_engQuery = `
{
  navbarCollection {
    items {
      navbar(locale:"en-US")
    }
  }
}
`;

export const nav_freQuery = `
{
  navbarCollection {
    items {
      navbar(locale: "fr")
    }
  }
}
`;
