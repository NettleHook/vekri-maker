<?php
class Vekri
{
    public $body;
    public $tail;
    public $ear;
    public $belly;
    public $face;
    public $horn;
    public $gem;
    public $eye;
    public $pupil;
    public $mouth;
    public $acc1 = '';
    public $acc2 = '';
    private $name = '';
    private $desc = '';

    function stringify()
    {
        $svg = "<svg
        xmlns='http://www.w3.org/2000/svg'
        xmlns:svg='http://www.w3.org/2000/svg'
        width = '200'
        height='230'
        viewbox='0 0 200 230'>";
        $svg .= "<g id='body'>";
        $svg .= $this->tail;
        $svg .= $this->ear;
        $svg .= $this->body;
        $svg .= "</g>";
        $svg .= $this->belly;
        $svg .= $this->horn;
        $svg .= $this->face;
        $svg .= $this->gem;
        $svg .= $this->eye;
        $svg .= $this->pupil;
        $svg .= $this->mouth;
        $svg .= "  <g id='paw'>
    <g transform='translate(7.4083338,-0.52916663)'>
       <path d='m 34.71092,83.167097 c 1.878492,2.041574 7.716585,2.109088 7.419128,-1.092996 -0.41306,-1.237817 -1.870126,-1.135355 -2.583447,-1.722297 -0.921012,-1.213772 -0.652405,-2.739743 -1.755418,-3.808927 -2.458708,-1.153449 -4.667836,4.536425 -3.080263,6.62422 z' />
       <ellipse cx='30.289249' cy='80.964539' rx='2.1031902' ry='1.5732526' />
       <ellipse cx='-63.839737' cy='69.744965' rx='2.1031902' ry='1.5732526' transform='rotate(-64.937399)' />
       <ellipse cx='-22.325676' cy='87.981796' rx='2.1031902' ry='1.5732526' transform='rotate(-34.49843)' />
    </g>
    <g transform='matrix(-1,0,0,1,160.64262,-0.67150686)'>
       <path d='m 34.71092,83.167097 c 1.878492,2.041574 7.716585,2.109088 7.419128,-1.092996 -0.41306,-1.237817 -1.870126,-1.135355 -2.583447,-1.722297 -0.921012,-1.213772 -0.652405,-2.739743 -1.755418,-3.808927 -2.458708,-1.153449 -4.667836,4.536425 -3.080263,6.62422 z' />
       <ellipse cx='30.289249' cy='80.964539' rx='2.1031902' ry='1.5732526' />
       <ellipse cx='-63.839737' cy='69.744965' rx='2.1031902' ry='1.5732526' transform='rotate(-64.937399)' />
       <ellipse cx='-22.325676' cy='87.981796' rx='2.1031902' ry='1.5732526' transform='rotate(-34.49843)' />
    </g>
 </g>";
        $svg .= "<g id='acc1'>" . $this->acc1 . "</g>";
        $svg .= "<g id='acc2'>" . $this->acc2 . "</g>";
        $svg .= "</svg>";
        return $svg;
    }
    function makeFile($submitName, $submitDesc, $filename)
    {
	$this->name = $submitName;
	$this->desc = $submitDesc;
	$file = fopen($filename, "w");
	fwrite($file, $this->stringify());
	fclose($file);
    }
}
