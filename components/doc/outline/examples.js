import { Button } from 'primereact/button';
import { DocSectionCode } from '../common/docsectioncode';
import { DocSectionText } from '../common/docsectiontext';

export function ExamplesDoc(props) {
    const code = {
        basic: `<div>
    <input>
    <div>Default browser focus styles applied</div>
</div>
<div>
    <input class="outline-none">
    <div>Default focus styles removed</div>
</div>
    `,
        expanded: `<div class="card">
    <div class="m-3 flex">
        <input class="mx-3 p-2">
        <div class="mx-3">Default browser focus styles applied</div>
    </div>
    <div class="m-3 flex">
        <input class="outline-none mx-3 p-2">
        <div class="mx-3">Default focus styles removed</div>
    </div>
</div>
`
    };

    return (
        <>
            <DocSectionText {...props}></DocSectionText>
            <div className="card">
                <div className="m-3 flex">
                    <input className="mx-3 p-2"></input>
                    <div className="mx-3">Default browser focus styles applied</div>
                </div>
                <div className="m-3 flex">
                    <input className="outline-none mx-3 p-2"></input>
                    <div className="mx-3">Default focus styles removed</div>
                </div>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
