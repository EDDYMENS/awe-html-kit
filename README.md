### AWE  HTML KIT 
The AWE HTML Kit makes it easy to build Tubes  that interact with the [AWEmpire API](http://awempire.com) , without writing a line of JavaScript.

### Getting Started
 **Credentials**

> To get started you should have an account with  [AWEmpire](http://awempire.com). After registering you will be provided with a `PSID` and an `accessKey` These can be found on the dashboard once you login onto the dashboard. They are needed in other for you to retrieve content using the HTML Kit.

**The SDK**

> In other for you as a user to not write Javascript to create your tube, we had to write it all out so that you don't have to. All of this is tucked away in a javascript library or SDK. You will need to pull this into your HTML files in other to get started. All you have to do is copy and paste the below into your HTML page 

    <script
    
    src="https://cdn.jsdelivr.net/gh/EDDYMENS/awe-html-kit@e078c6b6/awe-sdk.js"
    
    data-awe-connection
    
    data-awe-PSID="PSID-Here"
    
    data-awe-clientIp="clientIp-Here"
    
    data-awe-accessKey="accessKey-Here"
    
    ></script>

 and be sure to replace the `PSID-Here` and `accessKey-Here` with the one you copied from the Dashboard.  For the `clientIp-Here` , replace it with the IP of the server you are currently hosting the HTML pages on, If you are doing this on your local machine you may use `0.0.0.0` 

### Components
**Getting Videos**

> In other to render a list of videos you need to add the data attribute  `data-awe-list="label"` to the element this will cause the HTML Kit to repeat the innerHTML of the element with per each video available. Also in other to display images , descriptions and any other properties of a video you will need to attach `@` to the property label, this will be converted to its value during rendering. See an example below. 
> 

    <ul  data-awe-list="popular"  data-limit="20">
    
    <li>
    
    <a  href="details/?aweVideoId=@id">@title</a>
    
    <img  src="@previewImages.2" />
    
    @uploader
    
    </li>
    
    </ul>
Above you will notice the sample element has `data-awe-list` set to `popular`, popular is what is known as a label. This may not mean much right now , but will come in handy when we want to add pagination or render search results in this element. Also not the @ symbol, this is followed by video properties which is basically information about the video we will like to render . You can find the list of all available video properties in the **table 1.0.0**. In other to fine tune the list and kind of video you render you may pass extra data attrributes  to the element. For example the `data-limit` tag has been set to `20`  which will limit the number of videos to render to screen to 10 with or without pagination. You may find the full list of available attributes for tuning your video lisitng in the **table 1.1.0** 

**Table 1.0.0** 
<table>
<tr>
<td><b> Video properties</b></td>
<td><b>data type</b></td>
<td><b>Description (Eg)</b></td>
</tr>
<tr>
<td>id</td>
<td>Alphanumeric</td>
<td>eg: &lt;div data-awe-list=&quot;example&quot;&gt; &lt;span&gt;@id&lt;/span&gt; &lt;/div&gt;This will render the id between the span tags </td>
</tr>
<tr>
<td>duration</td>
<td>Decimals</td>
<td>This is the length of the video in minutes </td>
</tr>
<tr>
<td>title</td>
<td>Text</td>
<td>This is the title of the video</td>
</tr>
<tr>
<td>uploader</td>
<td>Text</td>
<td>This is the name of the uploader of the video</td>
</tr>
<tr>
<td>previewImages</td>
<td>Array</td>
<td>These are a list of preview images from the video.To render any of the images use an index counter. For example `previewImages.0` will render the first video and so on</td>
</tr>
<tr>
<td>tags</td>
<td>Array</td>
<td>These are a list of tags the video is associated with.To render any of the tags use an index counter. For example `tags.0` will render the first tag and so on</td>
</tr>
<tr>
<td>quality</td>
<td>Text</td>
<td>This will inform the quality grading of the video eg:hd or sd etc</td>
</tr>
</table>

**Table 1.1.0** 
<table>
<tr>
<td><b> Data atrribute</b></td>
<td><b>Possible values</b></td>
<td><b>Description (Eg)</b></td>
</tr>
<tr>
<td>data-limit="value"</td>
<td>0, 1, 2 ...</td>
<td>eg: data-limit=20 Remember if you don't specify the limit the default limit used is 10</td>
</tr>
<tr>
<td>data-sexualOrientation="value"</td>
<td>straight, gay, shemale</td>
<td>eg: data-sexualOrientation="gay" This will pull in videos based on the specified orientation</td>
</tr>
<tr>
<td>data-quality="value"</td>
<td>sd, hd, fhd, uhd</td>
<td>eg: data-quality="hd" Quality of the content to filter by.</td>
</tr>
<tr>
<td>data-tags="value1,value2,value3"</td>
<td>There are over 200 tags we will explore this in the <b>list tags</b> section</td>
<td>eg: data-tags="69, above average" This will pull a list of videos that conform to the choosen tags</td>
</tr>
</table>
**Add Paginating**

> Blockquote

**Add Page Loader**

> 
**List Tags**
> 
**Add Video player**
> Blockquote

**Add Search**

> Blockquote

 

	