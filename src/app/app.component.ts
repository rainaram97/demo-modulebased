import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// ✅ 1️⃣ Add tooltip div (before creating nodes)
  const tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('background', '#fff')
    .style('border', '1px solid #ccc')
    .style('padding', '6px 10px')
    .style('border-radius', '4px')
    .style('box-shadow', '0 2px 6px rgba(0,0,0,0.15)')
    .style('pointer-events', 'none')
    .style('opacity', 0);

  // ✅ 2️⃣ Draw links
  svg.selectAll('path.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#ccc')
    .attr('d', d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x)
    );

  // ✅ 3️⃣ Draw nodes
  const nodes = svg.selectAll('g.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.y},${d.x})`);

  nodes.append('circle')
    .attr('r', 6)
    .style('fill', '#69b3a2')
    // ✅ 4️⃣ Tooltip events
    .on('mouseover', (event, d) => {
      tooltip.transition().duration(200).style('opacity', 1);
      tooltip.html(`
        <strong>${d.data.name}</strong><br/>
        Type: ${d.data.type || 'N/A'}<br/>
        Value: ${d.data.value || '-'}
      `)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 20) + 'px');
    })
    .on('mousemove', (event) => {
      tooltip
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 20) + 'px');
    })
    .on('mouseout', () => {
      tooltip.transition().duration(300).style('opacity', 0);
    });

  // ✅ 5️⃣ Optional node labels
  nodes.append('text')
    .attr('dx', 10)
    .attr('dy', 3)
    .text(d => d.data.name)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  message! : string;

  constructor(private http : HttpClient){}

  ngOnInit(): void {
    // this.http.get<any>('http://localhost:3000/api/greet').subscribe(data => {
    //   this.message = data.message;
    // });
  }

}





import { Component, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-lineage-tree',
  templateUrl: './lineage-tree.component.html',
  styleUrls: ['./lineage-tree.component.css'],
})
export class LineageTreeComponent implements AfterViewInit {
  private svg: any;
  private g: any;
  private width = 1000;
  private height = 600;
  private duration = 400;
  private root: any;
  private treeLayout: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.createSvg();
    this.drawLineageTree();
  }

  private createSvg() {
    const element = this.el.nativeElement.querySelector('#lineageTree');

    this.svg = d3
      .select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', this.height)
      .call(
        d3.zoom().on('zoom', (event) => {
          this.g.attr('transform', event.transform);
        })
      );

    this.g = this.svg.append('g').attr('transform', 'translate(100,50)');
  }

  private drawLineageTree() {
    const data = {
      name: 'Source System',
      children: [
        {
          name: 'Database',
          children: [
            {
              name: 'Table A',
              children: [
                { name: 'Column 1' },
                { name: 'Column 2' },
                { name: 'Transform Job 1', children: [{ name: 'Target Table 1' }] },
              ],
            },
            { name: 'Table B', children: [{ name: 'View X' }, { name: 'View Y' }] },
          ],
        },
      ],
    };

    this.treeLayout = d3.tree().size([this.height - 100, this.width - 300]);
    this.root = d3.hierarchy(data, (d: any) => d.children);
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;

    // Collapse all initially
    this.root.children?.forEach(this.collapse);
    this.update(this.root);
  }

  private collapse(d: any) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach((child: any) => this.collapse(child));
      d.children = null;
    }
  }

  private update(source: any) {
    const treeData = this.treeLayout(this.root);
    const nodes = treeData.descendants();
    const links = treeData.links();

    nodes.forEach((d: any) => (d.y = d.depth * 180));

    // ***** NODES *****
    const node = this.g.selectAll('g.node').data(nodes, (d: any) => d.id || (d.id = ++i));
    let i = 0;

    const nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', () => `translate(${source.y0},${source.x0})`)
      .on('click', (event, d) => this.click(event, d));

    nodeEnter
      .append('circle')
      .attr('class', 'node-circle')
      .attr('r', 1e-6)
      .style('fill', (d: any) => (d._children ? '#2196f3' : '#fff'))
      .style('stroke', '#2196f3')
      .style('stroke-width', 2);

    nodeEnter
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d: any) => (d.children || d._children ? -14 : 14))
      .attr('text-anchor', (d: any) => (d.children || d._children ? 'end' : 'start'))
      .text((d: any) => d.data.name)
      .style('fill-opacity', 1e-6)
      .style('font-family', 'sans-serif')
      .style('font-size', '12px');

    // UPDATE
    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate
      .transition()
      .duration(this.duration)
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);

    nodeUpdate
      .select('circle.node-circle')
      .attr('r', 8)
      .style('fill', (d: any) => (d._children ? '#2196f3' : '#fff'));

    nodeUpdate.select('text').style('fill-opacity', 1);

    // EXIT
    const nodeExit = node
      .exit()
      .transition()
      .duration(this.duration)
      .attr('transform', () => `translate(${source.y},${source.x})`)
      .remove();

    nodeExit.select('circle').attr('r', 1e-6);
    nodeExit.select('text').style('fill-opacity', 1e-6);

    // ***** LINKS *****
    const link = this.g.selectAll('path.link').data(links, (d: any) => d.target.id);

    const linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', (d: any) => {
        const o = { x: source.x0, y: source.y0 };
        return this.diagonal(o, o);
      });

    const linkUpdate = linkEnter.merge(link);
    linkUpdate
      .transition()
      .duration(this.duration)
      .attr('d', (d: any) => this.diagonal(d.source, d.target))
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', 2);

    link
      .exit()
      .transition()
      .duration(this.duration)
      .attr('d', (d: any) => {
        const o = { x: source.x, y: source.y };
        return this.diagonal(o, o);
      })
      .remove();

    nodes.forEach((d: any) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  private diagonal(s: any, d: any) {
    return `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;
  }

  private click(event: any, d: any) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.update(d);
  }
}



.lineage-container {
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
  overflow: hidden;
  background-color: #fafafa;
}

.node-circle {
  cursor: pointer;
  transition: fill 0.2s;
}

.node-circle:hover {
  fill: #1976d2 !important;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

