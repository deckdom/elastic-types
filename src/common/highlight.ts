import { SearchQuery } from '../queries';

/**
 * Highlighters enable you to get highlighted snippets from one or more fields
 * in your search results so you can show users where the query matches are.
 * When you request highlights, the response contains an additional `highlight`
 * element for each search hit that includes the highlighted fields
 * and the highlighted fragments.
 * 
 * @see https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html
 */
export interface Highlight {
    /**
     * A string that contains each boundary character.
     * 
     * Defaults to `.,!? \t\n`.
     */
    boundary_chars?: string;
    /**
     * How far to scan for boundary characters.
     * 
     * Defaults to `20`. 
     */
    boundary_max_scan?: number;
    /**
     * Specifies how to break the highlighted fragments:
     * `chars`, `sentence`, or `word`.
     * 
     * Only valid for the unified and fvh highlighters.
     * 
     * Defaults to `sentence` for the `unified` highlighter.
     * Defaults to `chars` for the `fvh` highlighter.
     * 
     * * `chars`: Use the characters specified by `boundary_chars`
     *   as highlighting boundaries. The `boundary_max_scan` setting
     *   controls how far to scan for boundary characters.
     *   Only valid for the fvh highlighter. 
     * * `sentence`: Break highlighted fragments at the next sentence boundary,
     *   as determined by Java’s BreakIterator.
     *   You can specify the locale to use with `boundary_scanner_locale`.
     *   When used with the unified highlighter, the sentence scanner splits
     *   sentences bigger than `fragment_size` at the first word boundary next
     *   to fragment_size.
     *   You can set `fragment_size` to `0` to never split any sentence.
     * * `word`: Break highlighted fragments at the next word boundary,
     *   as determined by Java’s BreakIterator.
     *   You can specify the locale to use with `boundary_scanner_locale`.
     */
    boundary_scanner?: 'chars' | 'sentence' | 'word';
    /**
     * Controls which locale is used to search for sentence and word boundaries.
     * This parameter takes a form of a language tag,
     * e.g. `"en-US"`, `"fr-FR"`, `"ja-JP"`.
     * More info can be found in the Locale Language Tag documentation.
     * 
     * The default value is Locale.ROOT.
     * 
     * @see https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#forLanguageTag-java.lang.String-
     * @see https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#ROOT
     */
    boundary_scanner_locale?: string;
    /**
     * Indicates if the snippet should be HTML encoded: `default` (no encoding)
     * or `html` (HTML-escape the snippet text and then insert
     * the highlighting tags) fields 
     */
    encoder?: 'default' | 'html';
    /**
     * Specifies the fields to retrieve highlights for.
     * You can use wildcards to specify fields.
     * For example, you could specify `comment_*` to get highlights
     * for all text and keyword fields that start with `comment_`.
     */
    fields: string | string[];
    /**
     * Highlight based on the source even if the field is stored separately.
     * 
     * Defaults to `false`.
     */
    force_source?: false;
    /**
     * Specifies how text should be broken up in highlight snippets:
     * `simple` or `span`. Only valid for the plain highlighter.
     * 
     * Defaults to `span`.
     * 
     * * `simple`: Breaks up text into same-sized fragments.
     * * `span`: Breaks up text into same-sized fragments, but tries to avoid
     *   breaking up text between highlighted terms.
     *   This is helpful when you’re querying for phrases. Default.
     */
    fragmenter?: 'simple' | 'span';
    /**
     * Controls the margin from which you want to start highlighting.
     * Only valid when using the `fvh` highlighter. 
     */
    fragment_offset?: number;
    /**
     * The size of the highlighted fragment in characters.
     * 
     * Defaults to `100`. 
     */
    fragment_size?: number;
    /**
     * Highlight matches for a query other than the search query.
     * This is especially useful if you use a rescore query because
     * those are not taken into account by highlighting by default. 
     */
    highlight_query?: SearchQuery;
    /**
     * Combine matches on multiple fields to highlight a single field.
     * This is most intuitive for multifields that analyze the same string
     * in different ways. All `matched_fields` must have `term_vector` set
     * to `with_positions_offsets`, but only the field to which the matches
     * are combined is loaded so only that field benefits from having `store`
     * set to `yes`. Only valid for the `fvh` highlighter. 
     */
    matched_fields?: string[];
    /**
     * The amount of text you want to return from the beginning of the field
     * if there are no matching fragments to highlight.
     * 
     * Defaults to `0` (nothing is returned).
     */
    no_match_size?: number;
    /**
     * The maximum number of fragments to return.
     * If the number of fragments is set to `0`, no fragments are returned.
     * Instead, the entire field contents are highlighted and returned.
     * This can be handy when you need to highlight short texts
     * such as a title or address, but fragmentation is not required.
     * If `number_of_fragments` is `0`, `fragment_size` is ignored.
     * 
     * Defaults to `5`. 
     */
    number_of_fragments?: number;
    /**
     * Sorts highlighted fragments by score when set to `score`.
     * By default, fragments will be output in the order
     * they appear in the field (order: `none`).
     * Setting this option to `score` will output the most
     * relevant fragments first. Each highlighter applies its own
     * logic to compute relevancy scores.
     * See the document "How highlighters work internally" for more
     * details how different highlighters find the best fragments.
     * 
     * @see https://www.elastic.co/guide/en/elasticsearch/reference/7.x/highlighting.html#how-es-highlighters-work-internally
     */
    order?: 'score' | 'none';
    /**
     * Controls the number of matching phrases in a document that
     * are considered. Prevents the `fvh` highlighter from analyzing too many
     * phrases and consuming too much memory. When using `matched_fields`,
     * `phrase_limit` phrases per matched field are considered.
     * Raising the limit increases query time and consumes more memory.
     * Only supported by the `fvh` highlighter.
     * 
     * Defaults to `256`. 
     */
    phrase_limit?: number;
    /**
     * Use in conjunction with `post_tags` to define the HTML tags to use
     * for the highlighted text. By default, highlighted text is wrapped
     * in `<em>` and `</em>` tags. Specify as an array of strings. 
     */
    pre_tags?: string[];
    /**
     * Use in conjunction with `pre_tags` to define the HTML tags to use
     * for the highlighted text. By default, highlighted text is wrapped
     * in `<em>` and `</em>` tags. Specify as an array of strings. 
     */
    post_tags?: string[];
    /**
     * By default, only fields that contains a query match are highlighted.
     * Set `require_field_match` to `false` to highlight all fields.
     * 
     * Defaults to `true`.
     */
    require_field_match?: boolean;
    /**
     * Set to `styled` to use the built-in tag schema.
     * The `styled` schema defines the following `pre_tags`
     * and defines `post_tags` as `</em>`. 
     */
    tags_schema?: 'styled';
    /**
     * The highlighter to use: `unified`, `plain`, or `fvh`.
     * 
     * Defaults to `unified`.
     */
    type?: 'unified' | 'plain' |'fvh';
}
