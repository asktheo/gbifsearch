import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {SPECIESLIST} from './species_list';
import { Observable } from 'rxjs';
import { Kingdom, SpeciesClass, Order, Family, Genus, Species } from '../taxon/taxon';
import { koLocale } from 'ngx-bootstrap';
import { s } from '@angular/core/src/render3';


@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.css']
})
export class SpeciesListComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  speciesListAsTree: Kingdom[]
  kingdom: Kingdom
  speciesClass: SpeciesClass
  order: Order
  family: Family
  genus: Genus

  constructor() { 

  }

  ngOnInit() {
    this.speciesListAsTree = this.makeKingdomTree();
    console.log(this.speciesListAsTree)
  }

  selectKingdom(kingdom: number){
    this.kingdom= this.speciesListAsTree.find(k => k.kingdomKey == kingdom);
  }

  selectClass(c: number){
    this.speciesClass= this.kingdom.classes.find(cl => cl.classKey == c);
  }

  selectOrder(o: number){
    this.order= this.speciesClass.orders.find(or => or.orderKey == o);
  }

  selectFamily(f: number){
    this.family= this.order.families.find(fa => fa.familyKey == f);
  }

  selectGenus(g: number){
    this.genus = this.family.geni.find(ge => ge.genusKey == g);
  }

  selectSpecies(key: number){
    this.notifyParent.emit(key);
  }


  makeKingdomTree() : Kingdom[]{

    const result: Kingdom[] = [];

    SPECIESLIST.map(s =>{

        let king = result.find(k => k.kingdomKey === s.kingdomKey);
        if(!king){
          king = {
            kingdom : s.kingdom,
            kingdomKey : s.kingdomKey,
            classes: [] // new array for classes
          }
          result.push(king);
        }
        let speciesClass = king.classes.find(c => c.classKey === s.classKey);
        //fit into class list
        if(!speciesClass){
          speciesClass = {
            class : s.class,
            classKey : s.classKey,
            orders : [] // new array for families
          }
          king.classes.push(speciesClass);
        }

        //fint into orders list
        let ord = speciesClass.orders.find(o => o.orderKey === s.orderKey);
        if(!ord){
          ord = {
            order : s.order,
            orderKey : s.orderKey,
            families : [] // new array for families
          }
          speciesClass.orders.push(ord);
        }

        //fit into family list
        let fam = ord.families.find(f => f.familyKey === s.familyKey);
        if(!fam){
          fam = {
            family : s.family,
            familyKey : s.familyKey,
            geni : [] // new array for genuses
          }
          ord.families.push(fam);
        }

        //fit into geni list
        let gen = fam.geni.find(genus => genus.genusKey === s.genusKey);
        if(!gen){
          gen = {
            genus : s.genus,
            genusKey: s.genusKey,
            speciesList : [] 
          }
          fam.geni.push(gen);
        }
        const slimSpecies = {
          taxonKey: s.taxonKey,
          scientificName: s.scientificName,
          acceptedTaxonKey: s.acceptedTaxonKey,
          acceptedScientificName: s.acceptedScientificName,
          numberOfOccurrences: s.numberOfOccurrences,
          taxonRank: s.taxonRank,
          taxonomicStatus : s.taxonomicStatus
        }
        //finally put the species in the tree in the matching kingdom, class, family, genus
        gen.speciesList.push(slimSpecies);
      });

    return result;
  }



}
