export const atelier_engQuery = `
{
  carouselCollection {
    items {
      title(locale: "en-US")
      validation
      carouselImageCollection {
        items {
          url
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
          url
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
        url
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
        url
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
        url
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
        url
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
      artistName
      projectName
      year
      description(locale:"en-US") {
        json
      }
      galleryCollection {
        items {
          url
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
      artistName
      projectName
      year
      description(locale:"fr") {
        json
      }
      galleryCollection {
        items {
          url
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
      artistName
      projectName
      year
      description(locale:"en-US") {
        json
      }
      galleryCollection {
        items {
          url
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
      artistName
      projectName
      year
      description(locale:"fr") {
        json
      }
      galleryCollection {
        items {
          url
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
