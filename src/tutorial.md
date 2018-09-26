
### App Factory:

1. Do clarity seed app instalation. For instalation details take a look at https://builds.boemskats.com/nik/clarity-h54s-seed-app

2. Go to https://apps.boemskats.com/apps/ (App Factory), enter to Projects tab and select your project from a list of existing projects

3. Click on service you want to use in seed app project, and in left screen service details will be shown. Scroll to bottom and and click to GENERATE H54S CLARITY JAVASCRIPT button.   Pop-up window with code will be shown.

```
    // Replace this._adapterService with your injected adapter property name from the constructor
    // or change your constructor to something similar to this
    // constructor(private _adapterService: AdapterService) { }

    const data = this._adapterService.createTable([
    {
        "path": "/Tests/",
        "deftype": ""
    },
    {
        "path": "/Tests/wptest",
        "deftype": "StoredProcess"
    }
    ], 'InputObjects');


    try {
    const res = await this._adapterService.call('Service Editor/getObjectIDs', data);
    console.log(res);
    } catch(err) {
    // TODO: handle error
    console.log(err);
    }
```

4. Detail needed to implement service definition from App Factory is also Metadata Root. Click on project name and find Metadata Root field. Metadata Root is a service location and is crucial for h54s config file setup.

### Seed app project:

1. Go to component where you want to do a service call, use code from step 3 from previous section and copy it to function where you want to do a call. In seed app we have sample service call in home component (`app/home/home.component.ts`). Let's paste copied code inside body of `async ngAfterViewInit()`.
Before that, good article to read is : 
https://builds.boemskats.com/nik/clarity-h54s-seed-app/tree/test#using-h54s-inside-angular-clarity-seed-app

2. Do not forget to change `app/boemska/h54s.config.ts`:

```// h54s settings - for more information go to https://github.com/Boemska/h54s
export const AdapterSettings = {
  metadataRoot: '/metadata/root/path',
  hostUrl: 'http://example.com/' 
}
```
In this case metadata root is `/Apps/Meta Navigator/` - click on project name in App Factory to check Metadata Root.

```
export const AdapterSettings = {
  metadataRoot: '/Apps/Meta Navigator/',
  hostUrl: 'https://apps.boemskats.com' 
}
```
3. In most cases response will be object with couple of properties. To handle response create property `attrProps` in order to show that in view (html) :

```
  public attrProps: Array<any>;
```

So, instead `console.log(res)` add line  `this.attrProps = res.attrprop;` like this: 
```
try {
      const res = await this._adapterService.call('User/getDetails', data);
      this.attrProps = res.attrprop;
    } catch(err) {
      // TODO: handle error
      console.log(err);
    }
```
4. Now show `attrProps` property in home component view using [Clarity Data Grid component](https://vmware.github.io/clarity/documentation/v0.13/datagrid/structure). View should look like this:

```html
<clr-datagrid>
  <clr-dg-column>NAME</clr-dg-column>
  <clr-dg-column>TYPE</clr-dg-column>
  <clr-dg-column>VALUE</clr-dg-column>

  <clr-dg-row *ngFor="let props of attrProps">
      <clr-dg-cell>{{props.NAME}}</clr-dg-cell>
      <clr-dg-cell>{{props.TYPE}}</clr-dg-cell>
      <clr-dg-cell>{{props.VALUE}}</clr-dg-cell>
  </clr-dg-row>

  <clr-dg-footer>{{attrProps?.length}} props</clr-dg-footer>
</clr-datagrid>
```
