# ProgrammierProject
Programmier-Projekt
Gruppenmitglieder: Niklas Ebeling, Dennis Eisele, Roman von Bosse
Ziel: Eine Lernsoftware

MUST-HAVES:
    -Das Programm liest zu Beginn aus Dateien oder einer anderen Datenquelle wie z.B. localStorage mit JSON die Themen mit Sammlungen von Fragen/Antworten ein.
    -Es gibt Kategorien (oder Themen bzw. Kurse) — diese stehen für beliebige Themen oder Vorlesungsinhalte, die jemand lernen möchte (Beispiele: Englisch, Geographie, JavaScript, Algorithmen, etc.). Kategorien enthalten beliebig viele Fragen.
    -Verwaltungsmodus
        *Kategorien können erstellt werden (kann auch automatisch bei der Erstellung neuer Fragen in noch nicht vorhandenen Kategorien geschehen).
        *Fragen mit Antworten können für eine Kategorie erstellt werden.
        *Bearbeiten und Löschen von einzelnen Kategorien, Fragen und Antworten.
    -Anwendungsmodus
        *Das Programm fragt, zu welchem Themengebiet Fragen gestellt werden (z.B. Englisch-Vokabeln, Geographie, IT-Wissen) oder ob zufällige Fragen aus allen vorhandenen Themengebieten beantwortet werden sollen.
        *Es wird gefragt, wie viele Fragen zu dem Thema (oder aus allen Themen) beantwortet werden sollen.
        *Für diese Anzahl werden aus dem Thema (oder aus allen Themen) zufällige Fragen gewählt.
        *Die Fragen werden einzeln und nacheinander angezeigt und eine Antwort kann angegeben werden.
        *Es wird gezeigt, ob die Antwort richtig oder falsch war. Bei falscher Antwort wird die richtige angezeigt (zum Lernen).
        *Fragen/Antworten mit Lückentext oder echtes Multiple Choice (d.h. mögliche Mehrfachauswahl verschiedener vorgebener Antworten).

umgesetzte NICE-TO-HAVES:
    -"enquierer" um Eingaben dynamisch zu korrigieren, Multiple-Choice-Fragen intuitiver und leichter zu machen und Umlaute eingebbar
    -"chalk" zu besserer Übersichtlichkeit
    -es ist möglich fragen sortiert in zufälliger Reihenfolge abzufragen wenn nicht werden sie in einer Reihenfolge sortiert, die sich danach richtet wie oft die Frage falsch beantwortet wurde im Vergleich dazu wie oft diese insgesamt gefragt wurden -> optimierte Lernreihenfolge