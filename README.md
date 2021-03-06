# AWE HTML KIT

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/963a24cc17b142f8a8c8161d82b6fcf8)](https://app.codacy.com/app/EDDYMENS/awe-html-kit?utm_source=github.com&utm_medium=referral&utm_content=EDDYMENS/awe-html-kit&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.com/EDDYMENS/awe-html-kit.svg?branch=master)](https://travis-ci.com/EDDYMENS/awe-html-kit) [![StyleCI](https://github.styleci.io/repos/186000724/shield?branch=master)](https://github.styleci.io/repos/186000724) [![codecov](https://codecov.io/gh/EDDYMENS/awe-html-kit/branch/master/graph/badge.svg)](https://codecov.io/gh/EDDYMENS/awe-html-kit)

The AWE HTML Kit makes it easy to build Tubes that interact with the [AWEmpire API](http://awempire.com), without writing a line of JavaScript.
If you are not all that into reading you might want to check out the [video series](#swewe).

## Getting Started

### Credentials

> To get started you should have an account with [AWEmpire](http://awempire.com). After registering you will be provided with a `PSID` and an `accessKey` These can be found on the dashboard once you login onto the dashboard. They are needed in other for you to retrieve content using the HTML Kit.

### The SDK

> In other for you as a user to not write Javascript to create your tube, we had to write it all out so that you don't have to. All of this is tucked away in a javascript library or SDK. You will need to pull this into your HTML files in other to get started. All you have to do is copy and paste the below into your HTML page

    <script

    src="https://cdn.jsdelivr.net/gh/EDDYMENS/awe-html-kit/lib/library.min.js"

    data-awe-connection

    data-awe-PSID="PSID-Here"

    data-awe-clientIp="clientIp-Here"

    data-awe-accessKey="accessKey-Here"

    ></script>

and be sure to replace the `PSID-Here` and `accessKey-Here` with the one you copied from the Dashboard. For the `clientIp-Here`, replace it with the IP of the server you are currently hosting the HTML pages on, If you are doing this on your local machine you may use `0.0.0.0`

### Components

#### Getting Videos

> In other to render a list of videos you need to add the data attribute `data-awe-list="label"` to the element this will cause the HTML Kit to repeat the innerHTML of the element with per each video available. Also in other to display images, descriptions and any other properties of a video you will need to attach `@` to the property label, this will be converted to its value during rendering. See an example below.

    <ul  data-awe-list="popular"  data-limit="20">

    <li>

    <a  href="details/?aweVideoId=@id">@title</a>

    <img  src="@previewImages.2" />

    @uploader

    </li>

    </ul>

Above you will notice the sample element has `data-awe-list` set to `popular`, popular is what is known as a label. This may not mean much right now but will come in handy when we want to add pagination or render search results in this element. Also, note the @ symbol, this is followed by video properties which are basically information about the video we will like to render. You can find the list of all available video properties in the **table 1.0.0**. In other to fine-tune the list and kind of video you render you may pass extra data attributes to the element. For example, the `data-limit` tag has been set to `20` which will limit the number of videos to render to screen to 10 with or without pagination. You may find the full list of available attributes for tuning your video listing in the **table 1.1.0**

#### Table 1.0.0

|                    |               |                                                                                                                                                                         |
| ------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Video property** | **data type** | **Description (Eg)**                                                                                                                                                    |
| id                 | Alphanumeric  | eg: `<div data-awe-list="example"> <span>@id</span> </div>`This will render the id between the span tags                                                                |
| duration           | Decimals      | This is the length of the video in minutes                                                                                                                              |
| title              | Text          | This is the title of the video                                                                                                                                          |
| uploader           | Text          | This is the name of the uploader of the video                                                                                                                           |
| previewImages      | Array         | These are a list of preview images from the video.To render any of the images use an index counter. For example `previewImages.0` will render the first video and so on |
| tags               | Array         | These are a list of tags the video is associated with.To render any of the tags use an index counter. For example `tags.0` will render the first tag and so on          |
| quality            | Text          | This will inform the quality grading of the video eg:hd or sd etc                                                                                                       |

#### Table 1.1.0

|                                  |                                                                       |                                                                                                    |
| -------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Data atrribute**               | **Possible values**                                                   | **Description (Eg)**                                                                               |
| data-limit="value"               | 0, 1, 2 ...                                                           | eg: data-limit=20 Remember if you don't specify the limit the default limit used is 10             |
| data-sexualOrientation="value"   | straight, gay, shemale                                                | eg: data-sexualOrientation="gay" This will pull in videos based on the specified orientation       |
| data-quality="value"             | sd, hd, fhd, uhd                                                      | eg: data-quality="hd" Quality of the content to filter by.                                         |
| data-tags="value1,value2,value3" | There are over 200 tags we will explore this in the list tags section | eg: data-tags="69, above average" This will pull a list of videos that conform to the choosen tags |

#### Add Paginating

> You might want to list out a few videos at first but also give your users the ability to browse through similar remaining videos without loading all at once, this is where pagination comes in. Its pretty straight forward add this data attribute `data-awe-paginate="label"` to your HTML markdown for the pagination. Note that the label should be the same as the label for the list video component. This is the only way the Kit will know to match the paginator to the list video element.
> You may also set the length of your paginator using the `data-pager-length="10"` data attribute. Here is a complete example:

    <div  data-awe-paginate="popular"  data-pager-length="10">

    <button  data-pager-previous>

    << Prev

    </button>

    <button  data-pager-numbers></button>

    <button  data-pager-next>

    Next >>

    </button>

    </div>

Keep an eye for the the `data-pager-next` , `data-pager-numbers` , `data-pager-previous` these are important to render the paginator.

**Add Page Loader**
One of the nice to have when creating a tube is the ability to show a loader while the Kit fetches the videos from the server. This can easily be done using the `data-awe-loader="label"` data attribute. Again remember the label value should match that of the list video element, this way the loader will show up whenever there are no videos within that list video element. Here is a complete example

    <div  data-awe-loader="popular">

    Loading...

    </div>

#### List Tags

> You might want to list tags to allow users to click to video-specific video contents. This can be done using the `data-awe-tags="label"` data attribute. This will bring out the entire tag listing so you might want to limit this list using the `data-limit="10"` data attribute.
> Here is a complete example:

    <ul  data-awe-tags="alltags"  data-limit="10">

    <li>

    <a  href="/?videoTags=@tag">@tag</a>

    </li>

    </ul>

**NB:** Specifying a `https://base-url/?videoTags=tagName,tagName2` in the URL bar will render videos with those tags.

#### Add Video player

> Ultimately you would like your users to view videos, to do this you will have to first pass the video Id through the URL. For example `http://base-url/?aweVideoId=bab5c67a9e0b7bd2b42dda5cc0802503` where `aweVideoId` is the required key for passing the video and `bab5c67a9e0b7bd2b42dda5cc0802503` is the Id of the video.
> Next thing to do is assign an element for which the Kit will place the video player. To do this add the data attribute `data-awe-player="label"` to the element. Here is a complete example

    <div  data-awe-player="player"  style="width:600;height:600;">

    @title @duration

    </div>

Also, you may directly pass the video Id to the element using `data-videoId="videoId"`
where video Id is the Id of the video.
Here is a complete example below

    <div  data-awe-player="player"  data-videoId="bab5c67a9e0b7bd2b42dda5cc0802503"  style="width:600;height:600;">

    @title @duration

    </div>

#### Add Search

> The HTML Kit will not be complete without a way to search through videos. The search component is made up of two parts, the search box and the search button. Below is a complete example of a search component.

    <input  data-awe-search="popular" /><button  data-awe-search-btn="popular">

    Search

    </button>

Key things to remember is to set the label to be the same as the list video component's so that the search results can be displayed within that particular list video component.

#### Todo

-[x] Manage development with webpack

-[x] Minify production version

-[x] Break up script into components

-[ ] Add test suite

-[ ] Add directive for getting related videos
