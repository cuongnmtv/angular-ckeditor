import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '../../assets/js/ckeditor/ckeditor.js';
import { CkeditorService } from '../ckeditor.service.js';
import { Hero } from '../hero.js';
@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CkeditorComponent implements OnInit {

  items = [
    { id: '@swarley', userId: '1', name: 'Barney Stinson', link: 'https://www.imdb.com/title/tt0460649/characters/nm0000439' },
    { id: '@lilypad', userId: '2', name: 'Lily Aldrin', link: 'https://www.imdb.com/title/tt0460649/characters/nm0004989' },
    { id: '@marshmallow', userId: '3', name: 'Marshall Eriksen', link: 'https://www.imdb.com/title/tt0460649/characters/nm0781981' },
    { id: '@rsparkles', userId: '4', name: 'Robin Scherbatsky', link: 'https://www.imdb.com/title/tt0460649/characters/nm1130627' },
    { id: '@tdog', userId: '5', name: 'Ted Mosby', link: 'https://www.imdb.com/title/tt0460649/characters/nm1102140' }
  ];

  heroes: Hero[] = [];

  public Editor = ClassicEditor;
  constructor(private ckeditorService: CkeditorService) {
    console.log("constructor()");
    this.getHeroes();
  }

  getHeroes(): void {
    this.ckeditorService.getHeroes()
      .subscribe(heroesResource => heroesResource.data.forEach(
        e => console.log("@" + e.name)
        //e => this.items.push("@" + e.name)
      ));
  }

  test() {
    alert(this.items);
  }

  ngOnInit() {
    console.log('ngOnInit1');


    ClassicEditor
      .create(document.querySelector('#editor'), {
        mention: {
          feeds: [
            {
              marker: '@',
              feed: this.getFeedItems,
              itemRenderer: this.customItemRenderer,
              minimumCharacters: 0
            }
          ]
        },
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'imageUpload',
            //'blockQuote',
            //'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
          ]
        },
        language: 'vi',
        image: {
          toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
          ]
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
          ]
        },
        licenseKey: '',

      })
      .then(editor => {
        this.Editor = editor;

      })
      .catch(error => {
        console.error('Oops, something went wrong!');
        console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
        console.warn('Build id: tbvc9ux758g-8o65j7c6blw0');
        console.error(error);
      });
  }

  getFeedItems(queryText) {
    const items = [
      { id: '@swarley', userId: '1', name: 'Barney Stinson', link: 'https://www.imdb.com/title/tt0460649/characters/nm0000439' },
      { id: '@lilypad', userId: '2', name: 'Lily Aldrin', link: 'https://www.imdb.com/title/tt0460649/characters/nm0004989' },
      { id: '@marshmallow', userId: '3', name: 'Marshall Eriksen', link: 'https://www.imdb.com/title/tt0460649/characters/nm0781981' },
      { id: '@rsparkles', userId: '4', name: 'Robin Scherbatsky', link: 'https://www.imdb.com/title/tt0460649/characters/nm1130627' },
      { id: '@tdog', userId: '5', name: 'Ted Mosby', link: 'https://www.imdb.com/title/tt0460649/characters/nm1102140' },
  ];
    // As an example of an asynchronous action, return a promise
    // that resolves after a 100ms timeout.
    // This can be a server request or any sort of delayed action.
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('gggggggg' + items);
        const itemsToDisplay = items
          // Filter out the full list of all items to only those matching the query text.
          .filter(isItemMatching)
          // Return 10 items max - needed for generic queries when the list may contain hundreds of elements.
          .slice(0, 10);

        resolve(itemsToDisplay);
      }, 100);
    });

    // Filtering function - it uses `name` and `username` properties of an item to find a match.
    function isItemMatching(item) {
      // Make the search case-insensitive.
      const searchString = queryText.toLowerCase();

      // Include an item in the search results if name or username includes the current user input.
      return (
        item.name.toLowerCase().includes(searchString) ||
        item.id.toLowerCase().includes(searchString)
      );
    }
  }

  /*
  isMatching(item, queryText) {
    // Make the search case-insensitive.
    const searchString = queryText.toLowerCase();

    // Include an item in the search results if name or username includes the current user input.
    return (
      this.items.name.toLowerCase().includes(searchString) ||
      item.id.toLowerCase().includes(searchString)
    );
  }
  */

  customItemRenderer(item) {
    const itemElement = document.createElement('span');

    itemElement.classList.add('custom-item');
    itemElement.id = `mention-list-item-id-${item.userId}`;
    itemElement.textContent = `${item.name} `;

    const usernameElement = document.createElement('span');

    usernameElement.classList.add('custom-item-username');
    usernameElement.textContent = item.id;

    itemElement.appendChild(usernameElement);

    return itemElement;
  }
}



